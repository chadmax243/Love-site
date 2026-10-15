import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import PageTransition from "./components/PageTransition.jsx";
import FloatingHearts from "./components/FloatingHearts.jsx";

import LoveTest from "./pages/LoveTest.jsx";
import TestResult from "./pages/TestResult.jsx";
import Gifts from "./pages/Gifts.jsx";
import Bouquet from "./pages/Bouquet.jsx";
import VideoMessage from "./pages/VideoMessage.jsx";
import Letter from "./pages/Letter.jsx";

const PAGES = [
  { id: "love-test", Component: LoveTest },
  { id: "result", Component: TestResult },
  { id: "gifts", Component: Gifts },
  { id: "bouquet", Component: Bouquet, backToGifts: true },
  { id: "video", Component: VideoMessage, backToGifts: true },
  { id: "letter", Component: Letter, backToGifts: true },
];

export default function App() {
  const [pageId, setPageId] = useState("love-test");
  const [love, setLove] = useState(50);
  const [openedGifts, setOpenedGifts] = useState([]);

  const index = PAGES.findIndex((p) => p.id === pageId);
  const page = PAGES[index];
  const Page = page.Component;

  const next = () => {
    const nextPage = PAGES[Math.min(index + 1, PAGES.length - 1)];
    setPageId(nextPage.id);
  };

  const openGift = (id) => {
    setOpenedGifts((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
    setPageId(id);
  };

  const restart = () => {
    setOpenedGifts([]);
    setLove(50);
    setPageId("love-test");
  };

  return (
    <div className="shell">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        <PageTransition key={page.id}>
          <Page
            title={page.title}
            note={page.note}
            love={love}
            setLove={setLove}
            opened={openedGifts}
            onOpenGift={openGift}
            nextLabel={page.backToGifts ? "Back to my gifts" : undefined}
            onNext={page.backToGifts ? () => setPageId("gifts") : next}
            onRestart={restart}
            isLast={page.id === "letter"}
          />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
