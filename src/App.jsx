import UserRole from "./components/charts/userRole";
import UserCategory from "./components/charts/userCategory";
import ReportSummary from "./components/charts/reportSummary";
import SameReporterButton from "./components/[WIP] sameReporter";
import InstitutionStatistic from "./components/charts/[WIP] institutionStatistic";
import "./App.css";

function App() {
  return (
    <>
      <UserRole></UserRole>
      <UserCategory></UserCategory>
      <ReportSummary></ReportSummary>
      <InstitutionStatistic></InstitutionStatistic>
      <SameReporterButton></SameReporterButton>
    </>
  );
}

export default App;
