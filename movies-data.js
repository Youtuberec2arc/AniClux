// HindiAnimestuff — Movies catalog data
// Add a new object to this array for every movie.
//
// FIELDS:
//   id        -> unique slug, no spaces (used in the URL)
//   title     -> movie name
//   thumb     -> poster image URL
//   genres    -> array of genre tags, shown as filter-able tags
//   industry  -> one of: "Bollywood", "Hollywood", "South", "Other"  (used for the category filter chips)
//   year      -> release year (string or number)
//   runtime   -> e.g. "2h 10min"
//   language  -> audio languages, separated by " · "
//   subtitle  -> subtitle language
//   rating    -> IMDb-style rating, use "?" if unknown
//   quality   -> best available print quality shown as a badge, e.g. "1080p WEB-DL"
//   synopsis  -> short description
//   downloads -> object with a link for each quality. Leave a quality as ""
//                (empty string) if you don't have a link for it yet — its
//                button will simply be hidden on the details page.
//                Put your gdflix / hubcloud / other storage links here.
//       downloads: {
//         "480p":  "",
//         "720p":  "",
//         "1080p": ""
//       }

const MOVIES_DATA = [
  {
  id: "transformers-the-last-knight",
  title: "Transformers: The Last Knight",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_4919.png",
  genres: ["Action", "Adventure", "Science Fiction"],
  industry: "Hollywood",
  year: "2017",
  runtime: "2h 34min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "5.2",
  quality: "1080p BluRay",
  synopsis: "With Optimus Prime missing and humanity at war with the Transformers, Cade Yeager joins forces with unlikely allies to uncover an ancient secret that could determine the fate of Earth.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/r5ZI7UOteX",
    "720p": "https://new1.filesdl.in/cloud/nC78mzKPo9",
    "1080p": "https://new1.filesdl.in/cloud/iXZILVCjhA"
  }
},
{
  id: "enola-holmes-3",
  title: "Enola Holmes 3",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5273.png",
  genres: ["Mystery", "Thriller", "Adventure", "Crime"],
  industry: "Hollywood",
  year: "2026",
  runtime: "1h 49min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "?",
  quality: "HD WEB-DL",
  synopsis: "Enola Holmes takes on another dangerous mystery that leads her into a web of crime, deception, and unexpected allies while proving herself as a brilliant detective.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/3nsZkpm4it",
    "720p": "https://new1.filesdl.in/cloud/3uNnh9JGae",
    "1080p": "https://new1.filesdl.in/cloud/RUaQxi2IkW"
  }
},
{
  id: "jumanji-the-next-level",
  title: "Jumanji: The Next Level",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5287.png",
  genres: ["Adventure", "Comedy", "Fantasy"],
  industry: "Hollywood",
  year: "2019",
  runtime: "2h 3min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "6.7",
  quality: "1080p BluRay",
  synopsis: "When the gang returns to Jumanji to rescue one of their own, they discover that the game has changed, forcing them to face new challenges, strange environments, and dangerous enemies.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/5meWV0dFD6",
    "720p": "https://new1.filesdl.in/cloud/UbiPgdYGho",
    "1080p": "https://new1.filesdl.in/cloud/he4uBP2kix"
  }
},
{
  id: "cocktail-2-2026",
  title: "Cocktail 2 (2026)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5233.png",
  genres: ["Romance", "Comedy"],
  industry: "Bollywood",
  year: "2026",
  runtime: "2h 29min",
  language: "Hindi",
  subtitle: "English",
  rating: "?",
  quality: "HQCam",
  synopsis: "A romantic comedy that follows a fresh set of characters whose lives become entangled through love, friendship, misunderstandings, and unexpected twists that put their relationships to the test.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/DMjbCGU7YT",
    "720p": "https://new1.filesdl.in/cloud/AClG8y52ir",
    "1080p": "https://new1.filesdl.in/cloud/YX7qJnIMHW"
  }
},
{
  id: "hunting-jessica-brok-2025",
  title: "Hunting Jessica Brok (2025)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5289.png",
  genres: ["Action", "Thriller"],
  industry: "Hollywood",
  year: "2025",
  runtime: "2h 8min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "5.3",
  quality: "HD WEB-DL",
  synopsis: "A relentless pursuit turns into a deadly game of survival as Jessica Brok becomes the target of dangerous enemies, forcing her to outsmart and outfight those determined to capture her.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/I2KL7yfX3F",
    "720p": "https://new1.filesdl.in/cloud/F50xBDKMvC",
    "1080p": "https://new1.filesdl.in/cloud/2bILzciuBD"
  }
},
{
  id: "obsession-2026",
  title: "Obsession (2026)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5280.png",
  genres: ["Horror", "Thriller"],
  industry: "Hollywood",
  year: "2026",
  runtime: "1h 49min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "5.7",
  quality: "HD WEB-DL",
  synopsis: "A terrifying chain of events unfolds when an unhealthy obsession awakens dark secrets, leaving its victims trapped in a psychological nightmare where nothing is as it seems.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/7Z19BehvOA",
    "720p": "https://new1.filesdl.in/cloud/gkcDreiLt2",
    "1080p": "https://new1.filesdl.in/cloud/8n09z4I5UG"
  }
},
{
  id: "the-outpost-2020",
  title: "The Outpost (2020)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5277.png",
  genres: ["War", "Drama", "History", "Action"],
  industry: "Hollywood",
  year: "2020",
  runtime: "2h 3min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "6.8",
  quality: "1080p BluRay",
  synopsis: "Based on true events, a small group of U.S. soldiers stationed at a remote Afghan outpost faces an overwhelming attack in one of the fiercest battles of the Afghanistan War.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/ytf31rBSjl",
    "720p": "https://new1.filesdl.in/cloud/JEUOlt7YrP",
    "1080p": "https://new1.filesdl.in/cloud/yImzQXE2lj"
  }
},
{
  id: "wrong-turn-2021",
  title: "Wrong Turn (2021)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5276.png",
  genres: ["Horror", "Thriller"],
  industry: "Hollywood",
  year: "2021",
  runtime: "1h 50min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "5.6",
  quality: "1080p BluRay",
  synopsis: "A hiking trip through the Appalachian Trail becomes a terrifying fight for survival when a group of friends encounters a mysterious community living deep within the forest.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/TKbj1APZp2",
    "720p": "https://new1.filesdl.in/cloud/NGWOPuelfJ",
    "1080p": "https://new1.filesdl.in/cloud/Xu2Q7hA3kj"
  }
},
{
  id: "blast-2026",
  title: "Blast (2026)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5252.png",
  genres: ["Action", "Drama", "Family"],
  industry: "South",
  year: "2026",
  runtime: "2h 23min",
  language: "Hindi · Tamil",
  subtitle: "English",
  rating: "7.5",
  quality: "HD WEB-DL",
  synopsis: "A skilled martial arts family dedicated to protecting the innocent is drawn into a dangerous conspiracy. As powerful enemies close in, they must rely on courage, unity, and their fighting skills to survive and uncover the truth.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/fHRBvXzZOw",
    "720p": "https://new1.filesdl.in/cloud/KZr3jB1nD7",
    "1080p": "https://new1.filesdl.in/cloud/5NSBGaqDEl"
  }
},
{
  id: "tuck-jagadish-2021",
  title: "Tuck Jagadish (2021)",
  thumb: "https://i.ibb.co/LXvTmMx6/Gr-YPpw9r.jpg",
  genres: ["Drama", "Action", "Family"],
  industry: "South",
  year: "2021",
  runtime: "2h 25min",
  language: "Hindi · Telugu",
  subtitle: "English",
  rating: "?",
  quality: "HD WEB-DL",
  synopsis: "Tuck Jagadish is an action drama about a kind-hearted man who returns to his ancestral village and takes on powerful enemies to protect his family, reunite his loved ones, and uphold justice despite deep-rooted conflicts.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/ywhT5uaeqv",
    "720p": "https://new1.filesdl.in/cloud/LgSDyJo1he",
    "1080p": "https://new1.filesdl.in/cloud/v3tbmYU2ie"
  }
},
{
  id: "karuppu-2026",
  title: "Karuppu (2026)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5208.png",
  genres: ["Action", "Fantasy"],
  industry: "South",
  year: "2026",
  runtime: "2h 31min",
  language: "Hindi · Tamil",
  subtitle: "English",
  rating: "8.0",
  quality: "HD WEB-DL",
  synopsis: "A mystical action fantasy where a fearless warrior confronts ancient supernatural forces while fighting to protect his people from a powerful evil threatening their land.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/nZkGRjFDMp",
    "720p": "https://new1.filesdl.in/cloud/6UV279BAwM",
    "1080p": "https://new1.filesdl.in/cloud/huLvogNfqR"
  }
},
{
  id: "jurassic-world-2015",
  title: "Jurassic World (2015)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5306.png",
  genres: ["Adventure", "Science Fiction", "Thriller"],
  industry: "Hollywood",
  year: "2015",
  runtime: "2h 4min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "6.9",
  quality: "1080p BluRay",
  synopsis: "A genetically engineered dinosaur escapes containment at Jurassic World, forcing park staff and visitors into a desperate fight for survival as chaos spreads across the island.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/uvOfKn7oJs",
    "720p": "https://new1.filesdl.in/cloud/6DZNqzIeHB",
    "1080p": "https://new1.filesdl.in/cloud/QpnXuVqgl5"
  }
},
{
  id: "jurassic-world-fallen-kingdom-2018",
  title: "Jurassic World: Fallen Kingdom (2018)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5305.png",
  genres: ["Adventure", "Science Fiction", "Thriller"],
  industry: "Hollywood",
  year: "2018",
  runtime: "2h 9min",
  language: "Hindi · English",
  subtitle: "English",
  rating: "6.1",
  quality: "1080p BluRay",
  synopsis: "As a volcanic eruption threatens Isla Nublar, Owen and Claire return to rescue the remaining dinosaurs, only to uncover a dangerous conspiracy involving genetic engineering.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/OQBa1LJcot",
    "720p": "https://new1.filesdl.in/cloud/Ycn5hAjTRq",
    "1080p": "https://new1.filesdl.in/cloud/6zqlnchvVe"
  }
},
{
  id: "mario-2025",
  title: "Mario (2025)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5293.png",
  genres: ["Drama"],
  industry: "South",
  year: "2025",
  runtime: "2h 17min",
  language: "Hindi · Telugu",
  subtitle: "English",
  rating: "8.2",
  quality: "HD WEB-DL",
  synopsis: "A heartfelt drama that follows the emotional journey of individuals whose lives become deeply connected through unexpected relationships, difficult choices, and hope.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/nkmVyW2u8o",
    "720p": "https://new1.filesdl.in/cloud/fz46bdKcva",
    "1080p": "https://new1.filesdl.in/drive/MG16uW7Lx9"
  }
},
{
  id: "cocktail-2012",
  title: "Cocktail (2012)",
  thumb: "https://webp.iwebp.store/webp/280-380-3x-img.iwebp.store/images/imagecloud/poster_5243.png",
  genres: ["Romance", "Drama", "Comedy"],
  industry: "Bollywood",
  year: "2012",
  runtime: "2h 26min",
  language: "Hindi",
  subtitle: "English",
  rating: "6.3",
  quality: "1080p BluRay",
  synopsis: "A carefree man finds himself caught in a complicated love triangle between two close friends, testing their friendship, love, and personal growth.",
  downloads: {
    "480p": "https://new1.filesdl.in/cloud/Gs2NLEx3jW",
    "720p": "https://new1.filesdl.in/cloud/DT7wv6NYGn",
    "1080p": "https://new1.filesdl.in/cloud/ZmazLfd5Jg"
  }
}
];
module.exports = { MOVIES_DATA };

