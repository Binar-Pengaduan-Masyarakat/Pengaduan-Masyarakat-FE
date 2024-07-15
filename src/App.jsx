import UserRole from "./components/page-institute/charts/userRole";
import UserCategory from "./components/page-institute/charts/userCategory";
import ReportSummary from "./components/page-institute/charts/reportSummary";
import SameReporterButton from "./components/page-institute/[WIP] sameReporter";
import InstitutionStatistic from "./components/page-institute/charts/[WIP] institutionStatistic";
import Listreport from "./components/page-user/reports/Listreports";
import "./App.css";

function App() {
  return (
    <>
      <UserRole></UserRole>
      <UserCategory></UserCategory>
      <ReportSummary></ReportSummary>
      <InstitutionStatistic></InstitutionStatistic>
      <SameReporterButton></SameReporterButton>
      <Listreport></Listreport>
    </>
  );
}

export default App;
