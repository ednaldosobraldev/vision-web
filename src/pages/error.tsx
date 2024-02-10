import { Button } from "antd";
import { Link } from "react-router-dom";


export default function ErrorPage() {

    return (
        <div>
            ******************* Error Page *******************
            <Button >
                <Link to="/">Home</Link>
            </Button>
        </div>
    )
}