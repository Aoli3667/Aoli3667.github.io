import type { ImageMetadata } from "astro";
import type { LocalizedText } from "./i18n";

import restartChord from "../assets/projects/restart-rhythm-chord.png";
import restartHold from "../assets/projects/restart-rhythm-hold.png";
import restartEditor from "../assets/projects/restart-chart-editor.png";
import slimeyWall from "../assets/projects/slimey-wall.png";
import slimeyTraversal from "../assets/projects/slimey-traversal.png";
import slimeyCover from "../assets/projects/slimey-cover.png";
import egakuCharacter from "../assets/projects/egaku-character.png";
import egakuRunner from "../assets/projects/egaku-runner.png";
import egakuPainter from "../assets/projects/egaku-painter.png";
import urbanxExploration from "../assets/projects/urbanx-exploration.png";
import urbanxCctv from "../assets/projects/urbanx-cctv.png";
import urbanxSettings from "../assets/projects/urbanx-settings.png";

export type ProjectSlug = "restart" | "slimey" | "egaku" | "urban-x";

export interface ProjectMedia {
  src: ImageMetadata | string;
  width?: number;
  height?: number;
  reducedMotionPoster?: ImageMetadata;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface ProjectSection {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
}

export interface Project {
  slug: ProjectSlug;
  index: string;
  title: string;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  tags: string[];
  cover?: ProjectMedia;
  media: ProjectMedia[];
  sections: ProjectSection[];
  externalLink?: {
    href: string;
    label: LocalizedText;
  };
  accent: "cyan" | "yellow" | "coral" | "violet";
}

const media = (src: ImageMetadata | string, altEn: string, altZh: string, captionEn: string, captionZh: string): ProjectMedia => ({
  src,
  alt: { en: altEn, "zh-TW": altZh },
  caption: { en: captionEn, "zh-TW": captionZh },
});

export const projects: Project[] = [
  {
    slug: "restart",
    index: "01",
    title: "REstart",
    eyebrow: { en: "Rhythm × narrative systems", "zh-TW": "節奏 × 敘事系統" },
    summary: {
      en: "A Unity 6 project where a visual novel becomes the stage for precise, story-driven rhythm play.",
      "zh-TW": "一個以視覺小說承載敘事、並在劇情高潮切入精準節奏玩法的 Unity 6 專案。",
    },
    role: { en: "Solo developer · Systems designer", "zh-TW": "獨立開發 · 系統設計" },
    tags: ["Unity 6", "C#", "DSP timing", "Editor tooling", "Data-driven design"],
    cover: media(restartHold, "REstart rhythm gameplay showing tap and hold notes over a monochrome animated scene", "REstart 節奏玩法：單點與長按音符疊加於黑白演出畫面", "Tap, hold, chord, and visual events share one precise musical clock.", "Tap、Hold、Chord 與演出事件共用同一個精準音樂時鐘。"),
    media: [
      media(restartChord, "Three simultaneous rhythm notes approaching their hit circles in REstart", "REstart 中三顆同時縮圈的節奏音符", "Chord play layered directly into the narrative presentation.", "多押玩法直接融入敘事演出。"),
      media(restartHold, "A long hold note and several rhythm targets in REstart", "REstart 中的長按音符與多個節奏目標", "Timing feedback stays readable without interrupting the scene.", "判定回饋保持清楚，同時不打斷場景演出。"),
      media(restartEditor, "Custom Unity rhythm chart editor with waveform, notes, hold lanes, and authoring controls", "自製 Unity 節奏譜面編輯器，包含波形、音符、長按軌與製譜控制", "The custom chart editor keeps authoring and runtime data aligned.", "自製譜面工具讓製作流程與 Runtime 資料保持一致。"),
    ],
    sections: [
      {
        eyebrow: { en: "The design problem", "zh-TW": "設計問題" },
        title: { en: "Make rhythm feel like part of the story", "zh-TW": "讓節奏玩法真正成為故事的一部分" },
        body: {
          en: "REstart treats the visual novel as the main experience and rhythm stages as moments of conflict, discovery, and release. The two modes share directional input and a data-driven event bridge, so the transition feels authored rather than bolted on.",
          "zh-TW": "REstart 以視覺小說作為主要體驗，並把節奏關卡放在衝突、發現與情緒釋放的時刻。兩種模式共用方向輸入，並透過資料驅動事件橋接，讓切換成為敘事設計的一部分。",
        },
      },
      {
        eyebrow: { en: "Timing architecture", "zh-TW": "時序架構" },
        title: { en: "One hardware clock, four explicit offsets", "zh-TW": "單一硬體時鐘，四層明確 Offset" },
        body: {
          en: "Every note, judgement, approach ring, hold path, and visual event derives from AudioSettings.dspTime. Chart, audio-output, visual, and judgement offsets remain separate, preventing device latency fixes from silently changing chart semantics or presentation timing.",
          "zh-TW": "所有音符、判定、縮圈、Hold 路徑與演出事件都由 AudioSettings.dspTime 推導。譜面、音訊輸出、視覺與判定 Offset 各自獨立，避免裝置延遲補償暗中改變譜面語意或畫面時序。",
        },
      },
      {
        eyebrow: { en: "Creator workflow", "zh-TW": "製作流程" },
        title: { en: "Tools that use the same rules as the game", "zh-TW": "讓工具與遊戲使用同一套規則" },
        body: {
          en: "A custom Unity editor supports waveform navigation, snap divisions, tap and Bézier hold authoring, chords, visual events, safe-area previews, undo, validation, and v5 JSON export. Editor previews reuse the runtime evaluator instead of maintaining a second approximation.",
          "zh-TW": "自製 Unity 編輯器支援波形導覽、細分吸附、Tap 與 Bézier Hold、多押、演出事件、安全區預覽、Undo、驗證與 v5 JSON 匯出。Editor 預覽直接重用 Runtime evaluator，而不是另外維護近似版本。",
        },
      },
      {
        eyebrow: { en: "Narrative foundation", "zh-TW": "敘事基礎" },
        title: { en: "Typed dialogue, branching state, and resilient saves", "zh-TW": "型別化對話、分支狀態與可靠存檔" },
        body: {
          en: "The VN layer combines xNode authoring with validated JSON, typed events, conditional choices, cancelable async flow, a presentation catalog, and atomic multi-slot saves. Gameplay systems remain decoupled while the player experiences one continuous work.",
          "zh-TW": "VN 層結合 xNode 製作、驗證過的 JSON、型別化事件、條件選項、可取消非同步流程、演出 Catalog 與原子多槽存檔。底層系統保持解耦，玩家看到的則是一段連續體驗。",
        },
      },
    ],
    accent: "cyan",
  },
  {
    slug: "slimey",
    index: "02",
    title: "Slimey",
    eyebrow: { en: "2D adventure game", "zh-TW": "2D 冒險遊戲" },
    summary: {
      en: "A wall-walking slime adventure built around unusual traversal, responsive controls, and elemental forms.",
      "zh-TW": "以貼牆移動、靈敏操作與元素形態為核心的 2D 史萊姆冒險遊戲。",
    },
    role: { en: "Lead programmer", "zh-TW": "Lead Programmer" },
    tags: ["Unity", "C#", "Movement", "Object pooling", "UI systems"],
    cover: media(slimeyCover, "Slimey clinging to a vertical metal wall in a layered forest level", "Slimey 在森林關卡中附著於垂直金屬牆面", "Traversal asks the player to read every surface as a possible path.", "移動設計讓每個表面都可能成為路徑。"),
    media: [
      {
        ...media("/media/slimey/slime-walk.gif", "Animated Slimey gameplay demonstrating wall attachment and traversal", "Slimey 動態遊戲畫面，展示貼牆與移動機制", "Wall attachment changes both gravity and the player's frame of reference.", "貼牆機制同時改變重力與玩家的方向感。"),
        width: 426,
        height: 240,
        reducedMotionPoster: slimeyWall,
      },
      {
        ...media("/media/slimey/slime-attack.gif", "Animated Slimey gameplay demonstrating elemental attacks", "Slimey 動態遊戲畫面，展示元素攻擊", "Elemental forms turn collected forces of nature into distinct attacks.", "元素形態把收集到的自然力量轉化為不同攻擊。"),
        width: 426,
        height: 240,
        reducedMotionPoster: slimeyTraversal,
      },
    ],
    sections: [
      {
        eyebrow: { en: "Movement system", "zh-TW": "移動系統" },
        title: { en: "Treat walls as ground", "zh-TW": "把牆面當成地面" },
        body: {
          en: "The controller supports suspension, vertical climbing, and navigation around curved surfaces. Contact normals continuously redefine the attachment angle so movement remains legible while gravity appears to rotate around the character.",
          "zh-TW": "控制器支援懸掛、垂直攀爬與曲面移動。接觸法線會持續重新定義附著角度，讓重力彷彿繞著角色旋轉，同時保持操作方向清楚。",
        },
      },
      {
        eyebrow: { en: "Game feel", "zh-TW": "操作手感" },
        title: { en: "Forgiving inputs on unfamiliar geometry", "zh-TW": "在陌生幾何上提供寬容輸入" },
        body: {
          en: "Input direction adapts to the active wall angle. Jump buffering and coyote time preserve player intent during fast transitions, reducing the friction created by the game's deliberately unusual movement model.",
          "zh-TW": "輸入方向會配合目前牆面角度調整；Jump Buffer 與 Coyote Time 在快速轉換時保留玩家意圖，降低特殊移動模型帶來的挫折。",
        },
      },
      {
        eyebrow: { en: "Production systems", "zh-TW": "製作系統" },
        title: { en: "Reusable effects, configurable controls", "zh-TW": "可重用效果與可設定操作" },
        body: {
          en: "An extension of Unity's object pool manages recurring bullets and sound effects. Menu navigation works without a mouse and exposes remappable bindings, keeping the interface consistent with controller-first play.",
          "zh-TW": "延伸 Unity 物件池管理頻繁生成的子彈與音效；選單可完全不用滑鼠操作並支援自訂按鍵，讓介面與控制器優先的玩法保持一致。",
        },
      },
    ],
    externalLink: {
      href: "https://github.com/Aoli3667/Slimey",
      label: { en: "View on GitHub", "zh-TW": "前往 GitHub" },
    },
    accent: "yellow",
  },
  {
    slug: "egaku",
    index: "03",
    title: "Egaku",
    eyebrow: { en: "Asymmetric online co-op", "zh-TW": "非對稱線上合作" },
    summary: {
      en: "One player runs. The other draws the world beneath them. Cooperation becomes a live level-design conversation.",
      "zh-TW": "一位玩家奔跑，另一位即時畫出腳下世界；合作本身成為一場即時關卡設計對話。",
    },
    role: { en: "Lead programmer · Designer", "zh-TW": "Lead Programmer · Designer" },
    tags: ["Unity", "C#", "Photon PUN", "Dynamic mesh", "Multiplayer"],
    cover: media(egakuRunner, "Egaku runner crossing a hand-drawn platform over water", "Egaku 的 Runner 跨越水面上的手繪平台", "The runner depends on structures created by the painter in real time.", "Runner 依靠 Painter 即時建立的結構前進。"),
    media: [
      media(egakuCharacter, "Egaku character customizer with face, color, and play mode controls", "Egaku 角色自訂畫面，包含表情、顏色與遊玩模式", "A playful setup screen makes each little square feel personal.", "輕鬆的設定畫面讓每個小方塊都有自己的個性。"),
      media(egakuRunner, "Egaku gameplay showing a character and a dynamically drawn bridge", "Egaku 遊戲畫面：角色與即時繪製的橋樑", "Painter gestures become traversable geometry for the runner.", "Painter 的手勢會成為 Runner 可行走的幾何。"),
      media(egakuPainter, "Egaku painter interface with pencil tools and a generated white platform", "Egaku Painter 介面，顯示畫筆工具與生成的白色平台", "Different pens change size, mass, gravity, and interaction behavior.", "不同畫筆會改變尺寸、質量、重力與互動方式。"),
    ],
    sections: [
      {
        eyebrow: { en: "Core idea", "zh-TW": "核心概念" },
        title: { en: "Two roles, one shared problem", "zh-TW": "兩種角色，共同解決一個問題" },
        body: {
          en: "The runner reads timing, momentum, and hazards while the painter reads space and invents a route. Neither role has enough information or ability alone, turning communication into the central mechanic.",
          "zh-TW": "Runner 判讀時機、動量與危險，Painter 則理解空間並創造路徑。任何一方都無法獨自完成，使溝通成為真正的核心機制。",
        },
      },
      {
        eyebrow: { en: "Networking", "zh-TW": "連線系統" },
        title: { en: "Keep different views in sync", "zh-TW": "同步兩種不同視角" },
        body: {
          en: "Photon PUN handles lobby creation, role assignment, shared state, and role-specific actions. Each player receives a different interface, but both must agree on the geometry that changes moment by moment.",
          "zh-TW": "Photon PUN 負責大廳、角色分配、共享狀態與角色專屬操作。雙方看到不同介面，但必須對每一刻都在改變的幾何保持一致。",
        },
      },
      {
        eyebrow: { en: "Dynamic geometry", "zh-TW": "動態幾何" },
        title: { en: "Turn a brush stroke into a physical platform", "zh-TW": "把一道筆畫變成物理平台" },
        body: {
          en: "Mouse input is sampled into a runtime mesh that grows with the painter's stroke. Tool variants alter thickness, mass, gravity, and interactions, creating a small design language rather than a single all-purpose bridge.",
          "zh-TW": "滑鼠輸入會被取樣為隨筆畫成長的 Runtime Mesh。不同工具會改變粗細、質量、重力與互動，形成一套小型設計語言，而不只是萬用橋樑。",
        },
      },
    ],
    accent: "coral",
  },
  {
    slug: "urban-x",
    index: "04",
    title: "Urban X",
    eyebrow: { en: "First-person horror exploration", "zh-TW": "第一人稱恐怖探索" },
    summary: {
      en: "A first-person urban-exploration prototype about filming the mystery inside an abandoned high school.",
      "zh-TW": "一款第一人稱都市探索原型：拿起攝影機，揭開廢棄高中裡的失蹤謎團。",
    },
    role: { en: "Programmer", "zh-TW": "程式設計" },
    tags: ["Unity", "C#", "Timeline tooling", "Custom animation events", "Save system"],
    cover: media(
      urbanxExploration,
      "Urban X first-person view of a dark school courtyard through a recording camera overlay",
      "Urban X 第一人稱畫面：透過錄影介面探索昏暗的校園庭院",
      "The recording-camera view frames an investigation through an abandoned school.",
      "錄影攝影機視角串起玩家對廢棄校園的調查。",
    ),
    media: [
      media(
        urbanxExploration,
        "Urban X first-person view of a dark school courtyard through a recording camera overlay",
        "Urban X 第一人稱畫面：透過錄影介面探索昏暗的校園庭院",
        "The player records clues while exploring the school grounds.",
        "玩家在探索校園時以攝影機記錄線索。",
      ),
      media(
        urbanxCctv,
        "Urban X surveillance monitor showing a figure standing on a school stairwell",
        "Urban X 監視器畫面：一道人影站在校舍樓梯間",
        "Surveillance footage extends the mystery beyond the player's immediate view.",
        "監視器影像把謎團延伸到玩家視線之外。",
      ),
      media(
        urbanxSettings,
        "Urban X pause menu with controls and audio settings displayed on a handheld device",
        "Urban X 暫停選單：手持裝置上顯示操作與音訊設定",
        "The diegetic device keeps pause and settings controls inside the visual language of the game.",
        "手持裝置讓暫停與設定介面延續遊戲中的視覺語言。",
      ),
    ],
    sections: [
      {
        eyebrow: { en: "The experience", "zh-TW": "遊戲體驗" },
        title: { en: "Investigate through the camera", "zh-TW": "透過攝影機展開調查" },
        body: {
          en: "Urban X is a first-person, single-player 3D exploration walking simulator. The player enters a high school abandoned after nine students disappeared, filming the environment to uncover what happened.",
          "zh-TW": "Urban X 是第一人稱單人 3D 探索步行模擬遊戲。玩家進入一所因九名學生失蹤而荒廢的高中，透過拍攝環境逐步找出事件真相。",
        },
      },
      {
        eyebrow: { en: "Timeline tooling", "zh-TW": "Timeline 工具" },
        title: { en: "Author project-specific animation and events", "zh-TW": "製作專案專用動畫與事件" },
        body: {
          en: "I customized Unity Timeline so the team could sequence project-specific animations and gameplay events in one authoring workflow. This gave designers a clearer way to coordinate presentation and event timing without scattering that logic across scenes.",
          "zh-TW": "我客製化 Unity Timeline，讓團隊能在同一套製作流程中編排專案專用動畫與遊戲事件。設計者因此能更清楚地協調演出與事件時機，不必把相關邏輯分散在各個場景。",
        },
      },
      {
        eyebrow: { en: "Persistence", "zh-TW": "持久化系統" },
        title: { en: "Keep progress reliable across sessions", "zh-TW": "讓調查進度能可靠延續" },
        body: {
          en: "I also implemented the save system, preserving player progress and the game state needed to resume the investigation. The system supports the exploratory structure by letting players leave and return without losing their place.",
          "zh-TW": "我也負責實作存檔系統，保存玩家進度與恢復調查所需的遊戲狀態。這套系統支援探索式結構，讓玩家離開後仍能從原本位置繼續。",
        },
      },
    ],
    externalLink: {
      href: "https://elizabethcastreje.itch.io/urbanx",
      label: { en: "View on itch.io", "zh-TW": "前往 itch.io" },
    },
    accent: "violet",
  },
];

export const experiments = [
  { name: "Rhythm-in-my-head", href: "https://github.com/Aoli3667/Rhythm-in-my-head", note: "Rhythm prototype" },
  { name: "GDIM32_Phantom", href: "https://github.com/Aoli3667/GDIM32_Phantom", note: "Farm simulation" },
  { name: "Everyone Wants to Sit Besides the King", href: "https://github.com/Aoli3667/Everyone_Wants_to_Sit_besides_the_King", note: "Role-play card game" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
