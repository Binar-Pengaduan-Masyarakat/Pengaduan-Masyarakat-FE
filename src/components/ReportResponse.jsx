import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import ReportResultModal from "./Modal/ReportResultModal";
import InvestigationDetailsModal from "./Modal/InvestigationDetailsModal";
import PostResultFormModal from "./Modal/PostResultFormModal";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportResponse = ({ reportId }) => {
  const { userId } = useContext(UserContext);
  const [report, setReport] = useState(null);
  const [reportResult, setReportResult] = useState(null);
  const [reportResponses, setReportResponses] = useState(null);
  const [institutionDetails, setInstitutionDetails] = useState(null);
  const [responseDate, setResponseDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [reload, setReload] = useState(false);
  const [isSameCategory, setIsSameCategory] = useState(false);

  const fetchCategoryId = async (userId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories/user/${
        storedUser.id
      }?timestamp=${new Date().getTime()}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    const data = await response.json();
    return data.length > 0 ? data[0].categoryId : null;
  };

  const fetchData = async () => {
    try {
      const categoryId = await fetchCategoryId(userId);
      if (!categoryId) throw new Error("Category ID not found");

      const reportResponse = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/reports/${reportId}?timestamp=${new Date().getTime()}`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const reportData = await reportResponse.json();
      if (reportData.data) {
        setReport(reportData.data);
        const isSameCategoryCheck = categoryId === reportData.data.categoryId;
        setIsSameCategory(isSameCategoryCheck);

        const reportResultResponse = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/reportResults/${reportId}?timestamp=${new Date().getTime()}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        const resultData = await reportResultResponse.json();
        if (resultData.data) {
          setReportResult(resultData.data);
        } else {
          const reportResponseResponse = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/reportResponses/report/${reportId}?timestamp=${new Date().getTime()}`,
            {
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );
          const responseData = await reportResponseResponse.json();
          setReportResponses(responseData.data);

          if (responseData.data.length > 0) {
            const institutionResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/institutions/${
                responseData.data[0].userId
              }?timestamp=${new Date().getTime()}`,
              {
                headers: {
                  "Cache-Control": "no-cache",
                },
              }
            );
            const institutionData = await institutionResponse.json();
            setInstitutionDetails(institutionData);
            setResponseDate(responseData.data[0].responseDate);
          }
        }
      }
    } catch (err) {
      setError(err);
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reportId, reload]);

  const postResponse = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResponses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportId,
            userId,
          }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        alert("Response posted successfully!");
        setReload((prev) => !prev);
      } else {
        alert(`Error posting response: ${responseData.message}`);
      }
    } catch (err) {
      console.error("Post Error:", err);
      alert("Failed to post response.");
    }
  };

  const openModal = (component) => {
    setModalContent(component);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  let buttonContent;

  if (reportResult) {
    buttonContent = (
      <button
        className="btn btn-success"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          lineHeight: "1.2",
        }}
        onClick={() =>
          openModal(
            <ReportResultModal result={reportResult} onClose={closeModal} />
          )
        }
      >
        View Results
      </button>
    );
  } else if (reportResponses) {
    const isUserResponse = reportResponses.some(
      (response) => response.userId === userId
    );
    const isReportResponsesEmpty = reportResponses.length === 0;
    const isUserInstitution = userId.startsWith("IN");
    const isUserUS = userId.startsWith("US");

    if (isUserUS && !isReportResponsesEmpty) {
      buttonContent = (
        <button
          className="btn btn-primary"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          onClick={() =>
            openModal(
              <InvestigationDetailsModal
                responseDate={responseDate}
                institutionDetails={institutionDetails}
                onClose={closeModal}
              />
            )
          }
        >
          Investigation in Progress
        </button>
      );
    } else if (isUserUS) {
      buttonContent = (
        <button
          className="btn btn-secondary"
          style={{
            borderStyle: "none",
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          disabled
        >
          No Response Found
        </button>
      );
    } else if (isUserResponse) {
      buttonContent = (
        <button
          className="btn btn-warning"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          onClick={() =>
            openModal(
              <PostResultFormModal
                reportId={reportId}
                onClose={closeModal}
                setReload={setReload}
              />
            )
          }
        >
          Post Result
        </button>
      );
    } else if (isUserInstitution && isReportResponsesEmpty && isSameCategory) {
      buttonContent = (
        <button
          className="btn btn-success"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          onClick={postResponse}
        >
          Post Response
        </button>
      );
    } else if (reportResponses.some((response) => response.userId !== userId)) {
      buttonContent = (
        <button
          className="btn btn-primary"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          onClick={() =>
            openModal(
              <InvestigationDetailsModal
                responseDate={responseDate}
                institutionDetails={institutionDetails}
                onClose={closeModal}
              />
            )
          }
        >
          Investigation in Progress
        </button>
      );
    } else {
      buttonContent = (
        <button
          className="btn btn-secondary"
          style={{
            borderStyle: "none",
            padding: "10px 20px",
            fontSize: "16px",
            lineHeight: "1.2",
          }}
          disabled
        >
          No Response Found
        </button>
      );
    }
  } else {
    buttonContent = (
      <button
        className="btn btn-secondary"
        style={{
          borderStyle: "none",
          padding: "10px 20px",
          fontSize: "16px",
          lineHeight: "1.2",
        }}
        disabled
      >
        No Response Found
      </button>
    );
  }

  return (
    <div>
      {buttonContent}
      {modalContent && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div>{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportResponse;
