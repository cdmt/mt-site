export const pangrams = [
    "Two driven jocks help fax my big quiz.",
    "Fickle jinx bog dwarves spy math quiz.",
    "Public junk dwarves hug my quartz fox.",
    "Quick fox jumps nightly above wizard.",
    "Five quacking zephyrs jolt my wax bed.",
    "The five boxing wizards jump quickly.",
    "Pack my box with five dozen liquor jugs.",
] as const;

export function getRandomPangram() {
    return pangrams[Math.floor(Math.random() * pangrams.length)]!;
}
