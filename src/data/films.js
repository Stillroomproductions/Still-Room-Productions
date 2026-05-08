/**
 * Film data for Still Room Productions.
 * 
 * To add a new film:
 * 1. Add a new object to the array below
 * 2. Provide a unique `slug` (used for the URL)
 * 3. Set the `image` path to a file in /public or leave null for placeholder
 * 4. Update status as the project progresses
 */

const films = [
  {
    id: 1,
    slug: 'film-one',
    title: 'Film One',
    logline: 'A quiet drama about memory, place, and the lives we leave behind.',
    status: 'In Development',
    director: 'Director Name',
    producer: 'Producer Name',
    year: '2026',
    image: null, // Replace with image path, e.g. '/films/film-one.jpg'
    synopsis: 'Film One explores the fragile boundaries between memory and place. Set against the backdrop of a coastal town in winter, the film follows a woman returning to the house she grew up in, now empty and awaiting demolition. As she moves through its rooms, fragments of the past surface — conversations half-remembered, faces glimpsed in mirrors, the particular quality of light through familiar windows. The film is less concerned with narrative than with the texture of experience — how we carry places inside us long after we have left them.',
    format: 'Feature Film',
    runtime: null,
  },
  {
    id: 2,
    slug: 'film-two',
    title: 'Film Two',
    logline: 'Two strangers meet at the edge of a city neither of them belongs to.',
    status: 'Post-Production',
    director: 'Director Name',
    producer: 'Producer Name',
    year: '2025',
    image: null,
    synopsis: 'Film Two is an intimate portrait of displacement and connection. Over the course of a single evening, two people — both recently arrived in a city they do not yet understand — find themselves drawn into conversation. What begins as small talk gradually deepens into something more honest and uncertain. The film unfolds in near real-time, observing the delicate negotiation of trust between strangers, and the small revelations that emerge when we allow ourselves to be seen.',
    format: 'Short Film',
    runtime: '22 min',
  },
  {
    id: 3,
    slug: 'film-three',
    title: 'Film Three',
    logline: 'A documentary following three generations of women in a disappearing village.',
    status: 'Released',
    director: 'Director Name',
    producer: 'Producer Name',
    year: '2024',
    image: null,
    synopsis: 'Film Three documents the quiet resilience of a community on the verge of disappearance. In a remote village where the population has dwindled to fewer than forty residents, three women — a grandmother, her daughter, and her granddaughter — navigate the tension between staying and leaving. Through observational footage gathered over two years, the film captures the rhythms of daily life in a place that the wider world has largely forgotten, and asks what it means to belong somewhere that may not exist for much longer.',
    format: 'Documentary',
    runtime: '78 min',
  },
]

export default films
