import { useEffect, useRef, useState } from "react";
import generateRandomId from "./utils/generateRandomId";
import "./App.css";
import { Radio } from "./components/Radio";
import { STOP_WORDS } from "./constants/stop-words";

function App() {
  const [highlightColor, setHighlightColor] = useState("green");
  const [ranges, setRanges] = useState([]);
  const [dataState, setDataState] = useState([]);
  let { current: selection } = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (!selection) return;

    selection.removeAllRanges();

    ranges.forEach((range) => {
      selection.addRange(range);
    });

    return () => {
      selection.removeAllRanges();
    };
  }, [ranges, selection]);

  const getData = () => {
    if (!container.current) return;

    const highlighted = [...container.current.getElementsByTagName("span")];

    const data = { like: [], dislike: [], doNotUnderstand: [] };

    highlighted.forEach((span) => {
      const id = generateRandomId();
      const spanColor = span.style.backgroundColor;
      span.dataset.highlightId = id;

      const wordsOnTopOfElRegex = new RegExp(
        `.+(?=<span.*?data-highlight-id="${id}".*?>.+</span>)`
      );
      const mergeTagRegex = new RegExp(
        `<span style="background-color: ${spanColor};".*?>.*?</span> *?<span style="background-color: ${spanColor};".*?>.+</span>`
      );
      const removeSurroundingElRegex = new RegExp(
        `<span.*?data-highlight-id="${id}".*?>.+</span>`
      );

      const content = container.current.innerHTML
        .replaceAll("<br>", "\n")
        .match(wordsOnTopOfElRegex);

      const cleanHtmlRegex = /<[^>]+>/g;

      const cleanRegexMatch = container.current.innerHTML.match(mergeTagRegex);

      if (cleanRegexMatch) {
        const cleanHighlight = cleanRegexMatch[0].replace(cleanHtmlRegex, "");

        container.current.innerHTML = container.current.innerHTML.replace(
          mergeTagRegex,
          `<span style="background-color: ${spanColor};" data-highlight-id="${id}">${cleanHighlight}</span>`
        );
      }

      // Start of stop word validation
      const splittedPhrase = span.textContent.split(" ");

      if (
        STOP_WORDS.some(
          (word) => splittedPhrase.at(0).trim().toLowerCase() === word
        )
      ) {
        container.current.innerHTML = container.current.innerHTML.replace(
          removeSurroundingElRegex,
          `${splittedPhrase.at(
            0
          )} <span style="background-color: ${spanColor}" data-highlight-id="start-${id}">${splittedPhrase
            .slice(1, splittedPhrase.length)
            .join(" ")}</span>`
        );
      }

      if (
        STOP_WORDS.some(
          (word) => splittedPhrase.at(-1).trim().toLowerCase() === word
        )
      ) {
        container.current.innerHTML = container.current.innerHTML.replace(
          removeSurroundingElRegex,
          `<span style="background-color: ${spanColor}" data-highlight-id="${id}-end">${splittedPhrase
            .slice(0, splittedPhrase.length - 1)
            .join(" ")}</span> ${splittedPhrase.at(-1)}`
        );
      }

      switch (span.style.backgroundColor) {
        case "green":
          data.like.push({
            content: span.textContent,
            offsetFromStart: content
              ? content[0].replace(cleanHtmlRegex, "").length
              : 0,
          });
          break;
        case "red":
          data.dislike.push({
            content: span.textContent,
            offsetFromStart: content
              ? content[0].replace(cleanHtmlRegex, "").length
              : 0,
          });
          break;
        case "yellow":
          data.doNotUnderstand.push({
            content: span.textContent,
            offsetFromStart: content
              ? content[0].replace(cleanHtmlRegex, "").length
              : 0,
          });
          break;
      }
    });

    setDataState(data);
  };

  const handleHighlight = () => {
    selection = window.getSelection();

    if (!selection) return;
    if (!selection.toString().replace(/\s/g, "")) return;

    const range = selection.getRangeAt(0);

    document.designMode = "on";

    if (range) {
      setRanges((current) => [...current, range]);
    }

    document.execCommand("backColor", false, highlightColor);
    document.designMode = "off";

    getData();

    window.getSelection().removeAllRanges();
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
      onChange={(evt) => setHighlightColor(evt.target.value)}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Radio name="action" value="green" label="Like" />
        <Radio name="action" value="red" label="Dislike" />
        <Radio name="action" value="yellow" label="Do not understand" />
        <Radio name="action" value="transparent" label="Erase" />
      </div>
      <div
        ref={container}
        onMouseUp={handleHighlight}
        dangerouslySetInnerHTML={{
          __html:
            "Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br><br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br>Technology has transformed the way we live, work, and communicate. From the invention of the wheel to the creation of the internet, each new innovation has revolutionized society and opened up new possibilities. We now have the power to connect with people on the other side of the world in an instant, access a wealth of information at our fingertips, and even explore virtual realms through immersive virtual reality experiences.<br><br>",
        }}
      ></div>
      <pre>{JSON.stringify(dataState, null, 2)}</pre>
    </form>
  );
}

export default App;
