// AI 名詞小辭典的所有內容。新增名詞請照 AGENTS.md 的格式加在陣列最後面。
const TERMS = [
  {
    id: "llm", term: "LLM", zh: "大型語言模型", category: "基礎概念",
    oneLiner: "很會猜下一個字的超大模型",
    definition: "用大量文字訓練出來的模型，核心能力是根據前面的文字，預測下一個最可能出現的字。聊天、翻譯、寫程式，都是從這個能力延伸出來的。",
    analogy: "像一個讀遍圖書館的同學，你講上半句，他總能接出很像樣的下半句，但他不一定真的查證過。",
    example: "ChatGPT、Claude、Gemini 背後都是大型語言模型。",
    related: ["token", "hallucination"], added: "2026-11-16"
  },
  {
    id: "token", term: "Token", zh: "詞元", category: "基礎概念",
    oneLiner: "模型讀文字的最小單位",
    definition: "模型不是一個字一個字讀，而是把文字切成一小塊一小塊的 token。一個中文字可能是一個或好幾個 token。計費和長度限制通常都用 token 計算。",
    analogy: "像把整篇文章剪成一片一片的拼圖，模型是一片一片拼圖在看。",
    example: "API 的價格常寫成「每一百萬個 token 多少錢」。",
    related: ["llm", "context-window"], added: "2026-11-16"
  },
  {
    id: "context-window", term: "Context Window", zh: "上下文長度", category: "基礎概念",
    oneLiner: "模型一次記得住的內容量",
    definition: "模型一次能讀進來的 token 數量上限，包含你的問題、之前的對話和附上的檔案。超過上限，最早的內容就會被忘掉或截斷。",
    analogy: "像考試時允許帶的一張小抄，空間有限，寫不下的就只能放棄。",
    example: "對話聊得太長時，AI 開始忘記一開始說好的規則，常常就是這個原因。",
    related: ["token", "rag"], added: "2026-11-16"
  },
  {
    id: "hallucination", term: "Hallucination", zh: "幻覺", category: "基礎概念",
    oneLiner: "一本正經地胡說八道",
    definition: "模型產生聽起來很合理、但其實是錯的或不存在的內容。因為模型是在預測「像答案的文字」，不是在查證事實。",
    analogy: "像報告前一晚沒讀書的組員，上台講得頭頭是道，但內容是現場掰的。",
    example: "請 AI 列參考文獻，結果出現作者、標題都很像真的，但根本查不到的論文。",
    related: ["llm", "rag"], added: "2026-11-16"
  },
  {
    id: "temperature", term: "Temperature", zh: "溫度", category: "基礎概念",
    oneLiner: "控制回答有多隨機的旋鈕",
    definition: "決定模型選字時要多保守或多冒險的參數。溫度低，回答比較穩定、每次差不多；溫度高，回答比較多變、有創意。",
    analogy: "像點飲料：溫度低永遠點同一杯招牌，溫度高每次都想試新口味。",
    example: "算數學或寫程式適合調低溫度，想文案、取名字可以調高一點。",
    related: ["llm"], added: "2026-11-16"
  },
  {
    id: "prompt", term: "Prompt", zh: "提示詞", category: "使用技巧",
    oneLiner: "你交代給 AI 的那段話",
    definition: "輸入給模型的指令和資料。好的 prompt 要給正確的資訊和清楚的指引：要做什麼、給誰看、輸出成什麼樣子。",
    analogy: "像點餐時跟店員說的話，只說「隨便」和說「大杯微糖去冰」，拿到的東西差很多。",
    example: "「幫我寫信」不如「幫我寫一封 150 字、語氣禮貌的信，向教授請假一週」。",
    related: ["system-prompt", "few-shot"], added: "2026-11-16"
  },
  {
    id: "system-prompt", term: "System Prompt", zh: "系統提示詞", category: "使用技巧",
    oneLiner: "對話開始前就定好的角色設定",
    definition: "在使用者開始對話前，預先給模型的背景指令，用來設定角色、語氣和規則。它會影響整段對話的每一次回答。",
    analogy: "像打工第一天店長給的員工守則，之後每位客人來，你都照這份守則應對。",
    example: "做聊天機器人時，在 system prompt 寫「你是溫柔的學長，只回答跟選課有關的問題」。",
    related: ["prompt", "ai-agent"], added: "2026-11-16"
  },
  {
    id: "few-shot", term: "Few-shot", zh: "少樣本提示", category: "使用技巧",
    oneLiner: "先給幾個範例，再請它照做",
    definition: "在 prompt 裡放幾組「輸入→輸出」的範例，讓模型照著同樣的格式和風格回答，不需要重新訓練模型。",
    analogy: "像教新進工讀生，與其講一堆規則，不如直接示範兩次給他看。",
    example: "先給三則「評論→正面／負面」的例子，再丟新的評論給 AI 分類。",
    related: ["prompt", "fine-tuning"], added: "2026-11-16"
  },
  {
    id: "embedding", term: "Embedding", zh: "嵌入向量", category: "進階應用",
    oneLiner: "把文字變成一串代表意思的數字",
    definition: "用模型把一段文字轉成一組數字（向量）。意思越接近的文字，向量就越接近，所以可以用來找出「意思相似」的內容。",
    analogy: "像幫每本書在地圖上找座標，主題相近的書會放在附近，找書時看誰離你最近就好。",
    example: "搜尋「讀不下書」，也能找到寫著「沒有學習動力」的文章，因為兩者意思相近。",
    related: ["rag"], added: "2026-11-16"
  },
  {
    id: "rag", term: "RAG", zh: "檢索增強生成", category: "進階應用",
    oneLiner: "先查資料，再回答問題",
    definition: "回答之前，先從指定的資料庫裡找出最相關的段落，再把這些段落和問題一起交給模型回答。可以讓 AI 根據你的文件回答，減少幻覺。",
    analogy: "像開書考：不靠記憶硬答，而是先翻到相關的那頁再寫答案。",
    example: "把學校的選課規定做成 RAG 機器人，問「可以超修幾學分」，它會根據規定的條文回答。",
    related: ["embedding", "hallucination", "context-window"], added: "2026-11-16"
  },
  {
    id: "fine-tuning", term: "Fine-tuning", zh: "微調", category: "進階應用",
    oneLiner: "用自己的資料再訓練模型",
    definition: "拿一個已經訓練好的模型，用特定的資料再訓練一次，讓它更擅長某種任務或某種說話風格。成本比 prompt 和 RAG 高。",
    analogy: "像轉學生已經會基本的東西，再上一學期本校的專業課，變得更適應這裡。",
    example: "用大量客服對話紀錄微調模型，讓它回答時更像公司的客服口吻。",
    related: ["llm", "few-shot"], added: "2026-11-16"
  },
  {
    id: "ai-agent", term: "AI Agent", zh: "AI 代理", category: "進階應用",
    oneLiner: "不只回答，還會自己動手做事",
    definition: "讓模型可以使用工具、規劃步驟、檢查結果，一步一步完成任務，而不只是回一段文字。常見做法有 Tool Use、Planning 和 Reflection。",
    analogy: "一般聊天像問顧問意見；Agent 像請了一個助理，交代完他會自己去把事情辦好再回報。",
    example: "說「幫我把桌面的檔案分類」，Agent 會先看檔案、提出分類計畫，經過你同意後真的建資料夾、搬檔案。",
    related: ["tool-use", "system-prompt"], added: "2026-11-16"
  },
  {
    id: "tool-use", term: "Tool Use", zh: "工具使用", category: "進階應用",
    oneLiner: "讓 AI 呼叫計算機、搜尋等工具",
    definition: "告訴模型有哪些工具（函式）可以用，模型自己判斷何時呼叫、要帶什麼參數，程式執行後再把結果交回給模型，由它整理成回答。",
    analogy: "像會計不用心算，而是拿起計算機按，再把結果寫進報表。",
    example: "問「我們四個人吃了 1,280 元，一人多少？」，AI 呼叫計算機工具算出 320 元再回答。",
    related: ["ai-agent"], added: "2026-11-16"
  }
];
