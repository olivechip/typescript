type JobClass = "Paladin" | "Dark Knight" | "Warrior" | "Gunbreaker";

// Player Info
class PlayerInfo {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

interface Player {
    playerInfo: PlayerInfo;
    currentClass: JobClass;
    changeClass(newClass: JobClass): void;
}

// In-game Entity
class MyPlayer implements Player {
    playerInfo: PlayerInfo;
    currentClass: JobClass;
    currentClassInstance: TankClass;

    constructor(playerInfo: PlayerInfo, currentClass: JobClass = "Paladin") {
        this.playerInfo = playerInfo;
        this.currentClass = currentClass;
        this.currentClassInstance = new jobClassMap[currentClass](playerInfo);
    }

    changeClass = (newClass: JobClass): void => {
        if (newClass) {
            this.currentClass = newClass;
            this.currentClassInstance = new jobClassMap[newClass](this.playerInfo);
            console.log(`Successfully changed to ${newClass}!`);
        } else {
            console.log("Invalid class.");
        }
    };
}

interface Tank {
    tankStance: boolean;
    color: string;
    aggroLevel: number;
    toggleStance(): void;
    provoke(): void;
}

class TankClass implements Tank {
    playerInfo: PlayerInfo;
    tankStance: boolean;
    color: string;
    aggroLevel: number;

    constructor(playerInfo: PlayerInfo, tankStance = false, color = "blue", aggroLevel = 0) {
        this.playerInfo = playerInfo;
        this.tankStance = tankStance;
        this.color = color;
        this.aggroLevel = aggroLevel;
    }

    toggleStance = (): void => {
        this.tankStance = !this.tankStance;
        this.tankStance == false ? this.aggroLevel = 0 : null;
    }

    provoke = (): void => {
        this.aggroLevel = 10;
    }
}

class Paladin extends TankClass {
    fastBlade(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Fast Blade on ${target}!`;
    }
    riotBlade(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Riot Blade on ${target}!`;
    }
}

class DarkKnight extends TankClass {
    hardSlash(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Hard Slash on ${target}!`;
    }

    powerSlash(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Power Slash on ${target}!`;
    }
}

class Warrior extends TankClass {
    heavySwing(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Heavy Swing on ${target}!`;
    }

    skullSunder(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Skull Sunder on ${target}!`;
    }
}

class Gunbreaker extends TankClass {
    keenEdge(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Keen Edge on ${target}!`;
    }

    brutalShell(target: string): string {
        if (!target) throw new Error("Target must be provided!");
        return `${this.playerInfo.name} uses Brutal Shell on ${target}!`;
    }
}

const jobClassMap: Record<JobClass, new (playerInfo: PlayerInfo) => TankClass> = {
    Paladin: Paladin,
    "Dark Knight": DarkKnight,
    Warrior: Warrior,
    Gunbreaker: Gunbreaker,
};

// Tests
const newPlayer = new PlayerInfo("Astrid Leanna");
const me = new MyPlayer(newPlayer);
console.log(me.currentClass);

me.changeClass("Warrior");
console.log(me.currentClass);