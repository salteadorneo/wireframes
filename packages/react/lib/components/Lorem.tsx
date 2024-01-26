export function Lorem({
    words = 10
}: {
    words?: number
}) {
    const lorem = `Lorem ipsum dolor sit amet consectetur adipiscing elit Donec ultrices euismod semper 
    Vestibulum cursus massa condimentum sagittis augue sed euismod erat Duis quis porta quam et suscipit enim 
    Nullam lectus velit sagittis in lorem quis vehicula convallis elit Aenean id sollicitudin risus 
    Aenean sed pretium elit Cras blandit lacus quam Quisque ornare vitae nibh ut consectetur 
    Mauris vitae ante ac metus facilisis dapibus Nulla auctor eu ante in vulputate 
    Integer porta ipsum eu gravida aliquet lectus neque dictum quam at tempus enim lectus id dui 
    Ut vitae urna cursus vulputate sem sit amet imperdiet turpis Morbi semper ornare ante ac`
        .split(" ")
        .slice(0, words)
        .join(" ");

    return `${lorem}.`;
}