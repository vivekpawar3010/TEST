import "../CSS/Header.css";

function Header() {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    return (
        <header className="app-header">
            <h1 className="app-title">
                My Daily Routine & Task Manager
            </h1>
            <p className="app-date">
                {today}
            </p>
        </header>
    );
}

export default Header;
