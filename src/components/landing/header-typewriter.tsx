"use client";
import Typewriter from "typewriter-effect";

const HeaderTypewriter = () => {
  return (
    <h1 className="text-4xl font-bold">
      <Typewriter
        options={{
          loop: true,
        }}
        onInit={(typewriter) => {
          const strings = [
            "Moderation Bot",
            "Music Bot",
            "Utility Bot",
          ]
          let tw = typewriter
            .changeDelay(50)
            .typeString("Multi-Purpose Discord Bot")
            .pauseFor(1500)
            .deleteAll()
            .pauseFor(500)
          strings.forEach((string) => {
            tw = tw
              .typeString(string)
              .pauseFor(2000)
              .deleteAll()
              .pauseFor(500)
          })
          tw.start()
        }}
      />
    </h1>
  );
}
export default HeaderTypewriter;