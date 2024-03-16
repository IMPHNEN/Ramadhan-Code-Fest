export function getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Pagi';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Siang';
    } else {
        return 'Malam';
    }
}