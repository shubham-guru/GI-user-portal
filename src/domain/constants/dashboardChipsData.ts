import img1 from "../../assets/chip1.jpg";
import img2 from "../../assets/chip2.jpg";
import img3 from "../../assets/chip3.jpg";
import { routes } from "./routes";

export const dashboardChipsData = [
    {
        image: img1,
        priText: "Ship as little as",
        secText: "100 grams",
        btnText: "Add Order",
        href: routes.ORDERS
    },
    {
        image: img2,
        priText: "Want to know much does our service costs ?",
        secText: "Calculate Rate",
        btnText: "Rate Calculate",
        href: routes.RATECALCULATOR
    },
    {
        image: img3,
        priText: "Got Heavy Cargo ?",
        secText: "Get Discounted Price",
        btnText: "Contact us",
        href: ""
    },
]