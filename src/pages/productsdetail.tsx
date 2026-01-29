import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data with farmer contact
const dummyProduce = [
  {
    id: "1",
    farmerName: "John Kamau",
    farmerContact: {
      phone: "+254712345678",
      email: "johnkamau@gmail.com",
      whatsapp: "+254712345678",
    },
    name: "Fresh Tomatoes",
    pricePerUnit: 2.5,
    unit: "kg",
    quantity: 500,
    location: "Kiambu",
    description: "Fresh farm tomatoes harvested recently.",
    images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800"],
  },
  {
    id: "2",
    farmerName: "Mary Wanjiru",
    farmerContact: {
      phone: "+254798112233",
      email: "marywanjiru@gmail.com",
      whatsapp: "+254798112233",
    },
    name: "Organic Potatoes",
    pricePerUnit: 1.8,
    unit: "kg",
    quantity: 1000,
    location: "Nyandarua",
    description: "Organic potatoes grown without chemicals.",
    images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800"],
  },
];

export default function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = dummyProduce.find((p) => p.id === id);

  if (!product) {
    return <p className="p-6 text-red-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-4">

        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {product.name}
            </CardTitle>
            <Badge className="mt-2 w-fit">
              {product.location}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-5">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full rounded-lg object-cover max-h-[300px]"
            />

            <p className="text-green-600 text-3xl font-bold">
              ${product.pricePerUnit}/{product.unit}
            </p>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-sm text-muted-foreground">
              Farmer: {product.farmerName}
            </p>

            <p className="text-sm text-muted-foreground">
              Available Quantity: {product.quantity} {product.unit}
            </p>

            {/* Farmer Contact Info */}
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>📞 Phone: {product.farmerContact.phone}</p>
              <p>📧 Email: {product.farmerContact.email}</p>
              {product.farmerContact.whatsapp && (
                <p>💬 WhatsApp: {product.farmerContact.whatsapp}</p>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <Button className="flex-1">Add to Cart</Button>

              {/* Call Farmer */}
              <a href={`tel:${product.farmerContact.phone}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Call Farmer
                </Button>
              </a>

              {/* WhatsApp Chat */}
              {product.farmerContact.whatsapp && (
                <a
                  href={`https://wa.me/${product.farmerContact.whatsapp.replace(
                    "+",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    WhatsApp
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
