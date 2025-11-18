import { Button } from "./ui/button";

export function Hero() {
    return (
        <div className="bg-gradient-to-r from-primary to-accent text-center p-16">
            <h1 className="text-4xl">Entdecke die Zukunft der KI</h1>
            <p>Analyse und Strukturierung aufkommender Trends</p>
            <Button>Trends entdecken</Button>
            <Button variant="outline">Pro-Version testen</Button>
        </div>
    );
}