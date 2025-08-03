import logo from '/vite.svg'

const now = new Date();
export default function Header() {
    return (
        <header>
            {/*<h3>Hello world</h3>*/}
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <img src={logo} className="logo" alt="logo" />
            <span> Время сейчас: {
                now.toLocaleTimeString("en-US", {})
            } </span>
        </header>
    )
}