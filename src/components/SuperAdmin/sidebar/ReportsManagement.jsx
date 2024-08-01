/** @format */

import useFetchReports from "../../api/reports.API";
import "/public/css/SuperAdminManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/ReportsTable.css";
import { Container, Button, Table } from "react-bootstrap";

const ReportsManagement = () => {
  const { data, error, isLoading, deleteReport } = useFetchReports();

  const handleDelete = (reportId) => {
    deleteReport(reportId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-3">Reports Management</h3>
      </div>
      <div
        className="table-container"
        style={{
          overflowY: "auto",
          display: "block",
        }}>
        <Table striped bordered hover style={{ tableLayout: "auto" }}>
          <thead className="thead-dark">
            <tr>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Report ID
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                User ID
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Content
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Address
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Posted At
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data && data.data.length > 0 ? (
              data.data.map((report) => (
                <tr key={report.reportId}>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {report.reportId}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {report.userId}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {report.reportContent || "N/A"}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {report.address || "N/A"}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {report.createdAt}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(report.reportId)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ReportsManagement;
