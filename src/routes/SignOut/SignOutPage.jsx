import { DashboardWrapper } from "../../components/dashboardWrapper";

function SignOutPage() {
    return (
        <DashboardWrapper avtiveLinks={[false, false, true]}>
            <h1>SIGN OUT</h1>
        </DashboardWrapper>
    )
}

export { SignOutPage };