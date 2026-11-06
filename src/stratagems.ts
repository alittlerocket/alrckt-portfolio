export type Direction = "up" | "down" | "left" | "right";

export interface Stratagem
{
    name: string;
    code: Direction[];
    icon: string;
}

const ARROWS: Record<string, Direction> = {
    "U": "up",
    "D": "down",
    "L": "left",
    "R": "right",
};

function stratagem(name: string, code: string, file: string): Stratagem
{
    return {
        name,
        code: [...code].map(letter => ARROWS[letter]),
        icon: `/helldivers/stratagems/${file}`,
    };
}

export const STRATAGEMS: Stratagem[] = [
    stratagem("MG-43 Machine Gun", "DLDUR", "MG-43icon.svg"),
    stratagem("APW-1 Anti-Materiel Rifle", "DLRUD", "APW-1icon.svg"),
    stratagem("M-105 Stalwart", "DLDUUL", "M-105icon.svg"),
    stratagem("EAT-17 Expendable Anti-Tank", "DDLUR", "EAT-17icon.svg"),
    stratagem("GR-8 Recoilless Rifle", "DLRRL", "GR-8icon.svg"),
    stratagem("FLAM-40 \"Incinerator\" Flamethrower", "DLUDU", "FLAM-40icon.svg"),
    stratagem("AC-8 Autocannon", "DLDUUR", "AC-8icon.svg"),
    stratagem("RS-422 Railgun", "DRDULR", "RS-422icon.svg"),
    stratagem("FAF-14 Spear", "DDUDD", "FAF-14icon.svg"),
    stratagem("Orbital Gatling Barrage", "RDLUU", "OrbitalGatlingicon.svg"),
    stratagem("Orbital Airburst Strike", "RRR", "OrbitalAirbursticon.svg"),
    stratagem("Orbital 120MM HE Barrage", "RRDLRD", "Orbital120icon.svg"),
    stratagem("Orbital 380MM HE Barrage", "RDUULDD", "Orbital380icon.svg"),
    stratagem("Orbital Walking Barrage", "RDRDRD", "OrbitalWalkingicon.svg"),
    stratagem("Orbital Laser", "RDURD", "OrbitalLasericon.svg"),
    stratagem("Orbital Railcannon Strike", "RUDDR", "OrbitalRailcannonicon.svg"),
    stratagem("Eagle Strafing Run", "URR", "EagleStrafingicon.svg"),
    stratagem("Eagle Airstrike", "URDR", "EagleAirstrikeicon.svg"),
    stratagem("Eagle Cluster Bomb", "URDDR", "EagleClusterbombicon.svg"),
    stratagem("Eagle Napalm Airstrike", "URDU", "EagleNapalmicon.svg"),
    stratagem("LIFT-850 Jump Pack", "DUUDU", "LIFT-850icon.svg"),
    stratagem("Eagle Smoke Strike", "URUD", "EagleSmokeicon.svg"),
    stratagem("Eagle 110MM Rocket Pods", "URUL", "EagleRocketpodicon.svg"),
    stratagem("Eagle 500KG Bomb", "URDDD", "Eagle500icon.svg"),
    stratagem("Eagle Rearm", "UULUR", "HD2_Eagle_Rearm_Icon.svg"),
    stratagem("Orbital Precision Strike", "RRU", "OrbitalPrecisionicon.svg"),
    stratagem("Orbital Gas Strike", "RRDR", "OrbitalGasicon.svg"),
    stratagem("Orbital EMS Strike", "RRLD", "OrbitalEMSicon.svg"),
    stratagem("Orbital Smoke Strike", "RRDU", "OrbitalSmokeicon.svg"),
    stratagem("HMG Emplacement", "DULRRL", "HMGTurreticon.svg"),
    stratagem("Shield Generator Relay", "DDLRLR", "Shieldrelayicon.svg"),
    stratagem("Tesla Tower", "DURULR", "Teslaicon.svg"),
    stratagem("Anti-Personnel Minefield", "DLUR", "Minefieldicon.svg"),
    stratagem("B-1 Supply Pack", "DLDUUD", "B-1icon.svg"),
    stratagem("GL-21 Grenade Launcher", "DLULD", "GL-21icon.svg"),
    stratagem("LAS-98 Laser Cannon", "DLDUL", "LAS-98icon.svg"),
    stratagem("Incendiary Mines", "DLLD", "Fireminefieldicon.svg"),
    stratagem("AX/LAS-5 \"Guard Dog\" Rover", "DULURR", "AX-LAS-5icon.svg"),
    stratagem("SH-20 Ballistic Shield Backpack", "DLDDUL", "SH-20icon.svg"),
    stratagem("ARC-3 Arc Thrower", "DRDULL", "ARC-3icon.svg"),
    stratagem("LAS-99 Quasar Cannon", "DDULR", "LAS-99icon.svg"),
    stratagem("SH-32 Shield Generator Pack", "DULRLR", "SH-32icon.svg"),
    stratagem("Machine Gun Sentry", "DURRU", "MGsentryicon.svg"),
    stratagem("Gatling Sentry", "DURL", "Gatlingsentryicon.svg"),
    stratagem("Mortar Sentry", "DURRD", "Mortarsentryicon.svg"),
    stratagem("AD-334 Guard Dog", "DULURD", "AX-AR-23icon.svg"),
    stratagem("Autocannon Sentry", "DURULU", "Autocannoasentryicon.svg"),
    stratagem("Rocket Sentry", "DURRL", "Missilesentryicon.svg"),
    stratagem("EMS Mortar Sentry", "DURDR", "EMSmortaricon.svg"),
    stratagem("EXO-45 Patriot Exosuit", "LDRULDD", "PatriotIcon.svg"),
    stratagem("Resupply", "DDUR", "ResupplyIcon.svg"),
    stratagem("Reinforce", "UDRLU", "ReinforceIcon.svg"),
    stratagem("SOS Beacon", "UDRU", "SOSIcon.svg"),
    stratagem("Upload Data", "DDUUU", "UploadDataIcon.svg"),
    stratagem("Hellbomb", "DULDURDU", "Hellbomb.svg"),
    stratagem("SEAF Artillery", "RUUD", "Artillery.svg"),
    stratagem("Seismic Probe", "UULRDD", "SeismicProbeIcon.svg"),
    stratagem("Prospecting Drill", "DDLRDD", "DrillingIcon.svg"),
    stratagem("Orbital Illumination Flare", "RRLL", "IlluminationFlare.svg"),
    stratagem("Super Earth Flag", "DUDU", "SuperEarthFlag.svg"),
];
