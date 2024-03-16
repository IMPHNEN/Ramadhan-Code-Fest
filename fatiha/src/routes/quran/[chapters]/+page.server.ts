/**
 * Loads data for a specific chapter (Surah) of the Quran.
 * @param {Object} options - An object containing fetch and params objects.
 * @returns {Object} An object containing chapter details and contents.
 */
export const load = async ({ fetch, params }) => {
    // Fetch Surah data from the API
    const surahResponse = await fetch(`/fatiha/surah/${params.chapters}.json`);
    const surahData = await surahResponse.json();

    // Extract relevant data from the response
    const chapterName = surahData[params.chapters].name_latin;
    const chapterTexts = surahData[params.chapters].text;
    const chapterTranslations = surahData[params.chapters].translations.id.text;

    // Prepare an array to hold chapter contents
    let chapterContents = [];

    // Iterate through each verse in the Surah
    for (let i = 0; i < Object.values(chapterTexts).length; i++) {
        // Construct an object representing each verse
        const verse = {
            arabic: chapterTexts[i + 1], // Arabic text of the verse
            transliteration: chapterTranslations[i + 1] // Transliteration of the verse
        };

        // Add the verse object to the array of chapter contents
        chapterContents.push(verse);
    }

    // Return an object containing chapter details and contents
    return {
        pageChapter: params.chapters, // Chapter number
        pageTitle: chapterName, // Chapter name
        chapterContents: chapterContents // Array of chapter contents (verses)
    };
};
