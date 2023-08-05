import { NextResponse} from "next/server";

const middleware = req => {
    let verification = req.cookies.get("Card_visited")
    let url = req.url
    
    if (verification === "false" && url.includes("/card")){
        return NextResponse.redirect("http://localhost:3000/")
    }
    if (verification === "true" && url === "/checkout"){
        return NextResponse.redirect("/card")
    }
}

export const config = {
   matcher: ["/", "/checkout", "/card"]
}


export default middleware
