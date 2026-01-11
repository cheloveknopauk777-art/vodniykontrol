import { useState } from "react";
import { Minus, Plus, Truck, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OrderPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const pricePerBottle = 12.99;
  const deliveryFee = quantity >= 3 ? 0 : 4.99;
  const total = (quantity * pricePerBottle + deliveryFee).toFixed(2);

  const handleOrder = async () => {
    setIsOrdering(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsOrdering(false);
    setOrderPlaced(true);
    toast.success("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen hero-gradient pb-24 flex items-center justify-center px-6">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 rounded-full water-gradient mx-auto flex items-center justify-center shadow-glow mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your water will arrive tomorrow between 9AM - 12PM
          </p>
          <div className="glass-card p-5 text-left mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Delivery Details</span>
            </div>
            <p className="text-sm text-muted-foreground">Order #AQ-2026-0115-001</p>
            <p className="text-sm text-muted-foreground">{quantity}x 19L Water Bottle</p>
            <p className="text-sm font-medium text-foreground mt-2">Total: ${total}</p>
          </div>
          <Button 
            onClick={() => setOrderPlaced(false)}
            variant="outline"
            className="w-full"
          >
            Place Another Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Order Water</h1>
        <p className="text-muted-foreground">Fast delivery to your door</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Product Card */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl water-gradient flex items-center justify-center shadow-button">
              <span className="text-3xl">💧</span>
            </div>
            <div>
              <h2 className="font-bold text-xl text-foreground">Premium Spring Water</h2>
              <p className="text-muted-foreground">19L Bottle</p>
              <p className="text-lg font-semibold text-primary mt-1">${pricePerBottle}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <span className="font-medium text-foreground">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <span className="text-xl font-bold text-foreground w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Estimated delivery: <span className="font-medium text-foreground">Tomorrow, 9AM - 12PM</span>
            </p>
          </div>
          {quantity >= 3 && (
            <div className="mt-3 p-2 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm text-success font-medium">🎉 Free delivery on 3+ bottles!</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{quantity}x Water Bottle</span>
              <span className="text-foreground">${(quantity * pricePerBottle).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className={deliveryFee === 0 ? "text-success font-medium" : "text-foreground"}>
                {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-xl text-primary">${total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <Button
          onClick={handleOrder}
          disabled={isOrdering}
          className="w-full h-14 water-gradient text-primary-foreground text-lg font-semibold shadow-button hover:shadow-glow transition-all animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          {isOrdering ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Place Order • $${total}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
