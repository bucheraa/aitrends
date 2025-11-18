import { Button } from "./ui/button";

export function PricingTable() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="card">
                <h3>Free</h3>
                <ul>{/* Features */}</ul>
            </div>
            <div className="card">
                <h3>Pro</h3>
                <ul>{/* Features */}</ul>
                <Button>Monatlich abonnieren</Button>
                <Button>Jährlich abonnieren</Button>
            </div>
        </div>
    );
}