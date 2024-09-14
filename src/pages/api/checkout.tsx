import type {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {cartItems} = req.body;

        console.log("Processing payment for:", cartItems);

        res.status(200).json({success: true, message: "Payment processed successfully!"});
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}
