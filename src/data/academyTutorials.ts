/**
 * AKUL DRAVIN DIGITAL SERVICES (ADCS) • ACADEMY OF EXCELLENCE
 * END-TO-END MASTER TUTORIAL REPOSITORY & STUDY GUIDES
 * Comprehensive A-to-Z Modules for CRS-AI-101 and CRS-COMP-102
 */

export interface TutorialModule {
  id: string;
  courseId: 'CRS-AI-101' | 'CRS-COMP-102';
  moduleNumber: number;
  title: string;
  titleHi: string;
  estimatedMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  overview: string;
  overviewHi: string;
  sections: {
    heading: string;
    headingHi: string;
    content: string;
    codeSnippet?: string;
    keyTakeaway: string;
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  practicalExercise: {
    title: string;
    instructions: string[];
    expectedOutcome: string;
  };
}

export const ACADEMY_TUTORIAL_DATA: Record<string, TutorialModule> = {
  // =========================================================================
  // COURSE 1: CRS-AI-101 (ADCS AI Mastery & Prompt Engineering)
  // =========================================================================
  'CRS-AI-101-M1': {
    id: 'CRS-AI-101-M1',
    courseId: 'CRS-AI-101',
    moduleNumber: 1,
    title: 'Module 1: LLM Architecture & Token Limits',
    titleHi: 'मॉड्यूल 1: लार्ज लैंग्वेज मॉडल (LLM) आर्किटेक्चर एवं टोकन सीमाएं',
    estimatedMinutes: 30,
    level: 'Beginner',
    overview: 'Complete deep dive into transformer neural networks, self-attention mechanisms, tokenization algorithms, context windows, and sampling hyper-parameters.',
    overviewHi: 'ट्रांसफॉर्मर न्यूरल नेटवर्क, सेल्फ-अटेंशन मेकैनिज्म, टोकनाइज़ेशन, संदर्भ विंडो (Context Window) और सैंपलिंग पैरामीटर्स का संपूर्ण तकनीकी अध्ययन।',
    sections: [
      {
        heading: '1. The Transformer Foundation & Decoder-Only Architecture',
        headingHi: '1. ट्रांसफॉर्मर आर्किटेक्चर एवं डिकोडर-ओनली मॉडल',
        content: `Modern Large Language Models (LLMs) such as GPT-4, Gemini 2.0, and Claude 3.5 are built upon the Transformer architecture introduced by Vaswani et al. in 2017. Unlike older recurrent neural networks (RNNs) that processed text sequentially (word by word), transformers use parallel processing empowered by Multi-Head Self-Attention.
        
In a Decoder-Only architecture:
• Tokens are projected into high-dimensional embedding spaces (e.g., 4,096 to 12,288 dimensions).
• Positional encodings (RoPE - Rotary Position Embeddings) track the exact relative distance between words.
• Masked Causal Self-Attention ensures that during generation, each token can only attend to previous tokens, predicting the probability distribution of the next token.`,
        keyTakeaway: 'Transformers process all tokens simultaneously using self-attention, predicting the most probable next token given the prompt context.'
      },
      {
        heading: '2. Tokenization Mechanics & Byte-Pair Encoding (BPE)',
        headingHi: '2. टोकनाइज़ेशन प्रणाली एवं बाइट-पेयर एन्कोडिंग (BPE)',
        content: `LLMs do not read words or characters directly; they process discrete integer tokens mapped through a vocabulary dictionary (typically 32,000 to 256,000 tokens).
        
• In English: 1 token is approximately 0.75 words (or ~4 characters). A 1,000-word essay requires ~1,333 tokens.
• In Multilingual / Indic Languages (Hindi, Bengali, Tamil): Script characters use multi-byte UTF-8 sequences. Without specialized tokenizers, Hindi text can consume 2x to 3x more tokens than equivalent English prose.
• Byte-Pair Encoding (BPE) iteratively merges frequent byte pairs. Common subwords like "ing", "tion", "pre" receive single token IDs, while rare words are broken into smaller morphemes.`,
        codeSnippet: `// Python tiktoken / HuggingFace tokenizer example
import tiktoken

encoding = tiktoken.get_encoding("cl100k_base")
text = "Akul Dravin Digital Services provides 64+ assisted services."
tokens = encoding.encode(text)

print(f"Token Count: {len(tokens)}")
print(f"Token IDs: {tokens}")
print(f"Decoded: {[encoding.decode([t]) for t in tokens]}")`,
        keyTakeaway: 'Always measure prompt size in tokens rather than word count. In multilingual workflows, account for token inflation.'
      },
      {
        heading: '3. Context Window Budgets & Needle-In-A-Haystack Dynamics',
        headingHi: '3. कॉन्टेक्स्ट विंडो बजट एवं सूचना पुनर्प्राप्ति',
        content: `The Context Window represents the maximum total tokens (Input Prompt + Generated Output) that an LLM can retain in active memory during a single forward pass.
        
• Modern Context Scales: 8,192 tokens (legacy), 32,768 (standard), 128,000 (enterprise), to 1,000,000+ tokens (Gemini 1.5 Pro).
• The "Lost in the Middle" Phenomenon: Research shows that models recall information located at the very beginning (Primacy effect) and very end (Recency effect) of the context window far better than facts buried deep in the middle 50%.
• Context Window Caching: Modern APIs (like Gemini & Anthropic) allow pre-caching long system prompts or PDFs, reducing latency by 80% and API cost by 50%.`,
        keyTakeaway: 'Place your most critical instructions, system rules, and schemas at the beginning and summary reminders at the end of large prompts.'
      },
      {
        heading: '4. Generation Hyperparameters: Temperature, Top-P, Top-K',
        headingHi: '4. सैंपलिंग पैरामीटर्स: टेम्परेचर, टॉप-P एवं टॉप-K',
        content: `Once the model calculates probability logits for every token in its vocabulary, sampling hyper-parameters govern selection:
        
• Temperature (T: 0.0 to 2.0): Scales logit sharpness.
  - T = 0.0 (Greedy / Deterministic): Always picks the highest probability token. Best for SQL generation, code compilation, math, and structured JSON.
  - T = 0.7 to 1.0 (Balanced Creative): Smooths probabilities, introducing lexical diversity. Best for marketing copy, blog posts, and brainstorming.
• Top-P (Nucleus Sampling: 0.1 to 1.0): Accumulates top tokens whose cumulative probability reaches P. Discards the long tail of unlikely tokens.
• Top-K (e.g., 40): Limits consideration strictly to the top K most probable tokens.`,
        codeSnippet: `// Recommended Generation Settings for ADCS Workflows:
{
  "json_api_extraction": { "temperature": 0.0, "top_p": 0.1 },
  "legal_document_scrutiny": { "temperature": 0.1, "top_p": 0.2 },
  "customer_support_chat": { "temperature": 0.4, "top_p": 0.8 },
  "marketing_ad_creative": { "temperature": 0.85, "top_p": 0.95 }
}`,
        keyTakeaway: 'Use Temperature = 0 for programmatic, factual, and JSON tasks; use 0.7+ for creative and conversational tasks.'
      }
    ],
    quizQuestions: [
      {
        question: 'What happens to LLM output when Temperature is set to 0.0?',
        options: [
          'The model generates random and chaotic text',
          'The model acts deterministically, always selecting the highest-probability token',
          'The model outputs zero tokens and returns an error',
          'The physical CPU cooling temperature drops to zero'
        ],
        correctIndex: 1,
        explanation: 'Temperature 0.0 enforces greedy decoding, selecting the highest-probability token every time for deterministic outputs.'
      },
      {
        question: 'Roughly how many tokens are in 75 English words?',
        options: ['10 tokens', '50 tokens', '100 tokens', '500 tokens'],
        correctIndex: 2,
        explanation: 'The standard English token-to-word ratio is approximately 1 word ≈ 1.33 tokens (or 100 tokens ≈ 75 words).'
      },
      {
        question: 'What is the "Lost in the Middle" phenomenon in long context windows?',
        options: [
          'The server running the model crashes midway through generation',
          'The model forgets tokens at the beginning of the prompt',
          'The model shows lower retrieval accuracy for information situated in the center of long inputs',
          'Tokens get deleted randomly during transmission'
        ],
        correctIndex: 2,
        explanation: 'Empirical studies show models attend most strongly to the beginning and end of long contexts, while middle details are prone to degradation.'
      }
    ],
    practicalExercise: {
      title: 'Token Budget & Context Optimization Lab',
      instructions: [
        '1. Take a 500-word government policy notification in English.',
        '2. Translate it into Hindi and calculate the token length difference using BPE.',
        '3. Re-structure the prompt so that statutory mandatory conditions are positioned in the top 10% primacy zone.'
      ],
      expectedOutcome: 'Demonstration of ~2x token reduction and 100% adherence to statutory rules under zero-temperature inference.'
    }
  },

  'CRS-AI-101-M2': {
    id: 'CRS-AI-101-M2',
    courseId: 'CRS-AI-101',
    moduleNumber: 2,
    title: 'Module 2: Advanced Few-Shot Prompt Engineering',
    titleHi: 'मॉड्यूल 2: एडवांस्ड फ़्यू-शॉट प्रॉम्प्ट इंजीनियरिंग एवं चैन-ऑफ-थॉट',
    estimatedMinutes: 35,
    level: 'Intermediate',
    overview: 'Master in-context learning, Chain-of-Thought (CoT), Few-Shot exemplar formatting, system prompt architecture, and strict JSON schema generation.',
    overviewHi: 'इन-कॉन्टेक्स्ट लर्निंग, चैन-ऑफ-थॉट (CoT), फ़्यू-शॉट उदाहरण प्रारूप, सिस्टम प्रॉम्प्ट डिजाइन और वैध JSON स्कीमा निर्माण का गहन अभ्यास।',
    sections: [
      {
        heading: '1. In-Context Learning: Zero-Shot vs Few-Shot',
        headingHi: '1. इन-कॉन्टेक्स्ट लर्निंग: ज़ीरो-शॉट बनाम फ़्यू-शॉट',
        content: `In-Context Learning (ICL) allows models to adapt to complex tasks without updating neural weights.
        
• Zero-Shot: The model is given only the direct instruction without examples. Suitable for common tasks (e.g. "Summarize this article").
• Few-Shot (Exemplar-Driven): The prompt includes 2 to 5 curated input-output demonstrations before the target query. This anchors output structure, style, tone, and edge-case handling.
• Formatting Best Practice: Always separate exemplars clearly using XML tags (<example></example>) or clear markdown fences to avoid prompt injection or bleeding.`,
        codeSnippet: `<task>Classify Indian citizen grievance categories into BBPS, AEPS, or PAN.</task>

<example>
Input: "My electricity bill payment was deducted but receipt not issued."
Output: {"category": "BBPS", "priority": "HIGH", "department": "Utility Bills"}
</example>

<example>
Input: "Fingerprint scanner failed at DigiPay counter during cash withdrawal."
Output: {"category": "AEPS", "priority": "CRITICAL", "department": "Banking Ops"}
</example>

<target>
Input: "Name spelling is wrong in newly delivered physical PVC card."
Output:`,
        keyTakeaway: 'Few-shot examples drastically reduce hallucination and guarantee adherence to complex organizational schemas.'
      },
      {
        heading: '2. Chain-of-Thought (CoT) & Step-by-Step Reasoning',
        headingHi: '2. चैन-ऑफ-थॉट (CoT) एवं चरणबद्ध तार्किक विश्लेषण',
        content: `When presented with multi-step arithmetic, statutory logic, or legal verification, LLMs often make errors if forced to answer immediately.
        
• Zero-Shot CoT: Simply adding the trigger phrase "Think step-by-step before answering" forces the model to generate intermediate reasoning tokens, activating latent reasoning paths.
• Manual CoT: Providing exemplars where the reasoning scratchpad is explicitly written out before the final conclusion.
• Self-Consistency: Generating multiple CoT paths (e.g., N=5) at Temperature 0.7 and selecting the majority-consensus answer.`,
        keyTakeaway: 'Force the model to output reasoning steps inside <thinking> tags before producing the final decision.'
      },
      {
        heading: '3. System Prompt Persona & Negative Constraint Guardrails',
        headingHi: '3. सिस्टम प्रॉम्प्ट पर्सोना एवं नकारात्मक प्रतिबंध नियम',
        content: `System Prompts define the boundary conditions, capabilities, and ethical guardrails of an AI assistant.
        
Key Components of an Enterprise System Prompt:
1. Identity & Role: "You are Antigravity, an AI assistant for Akul Dravin Digital Services."
2. Scope of Authority: "You can assist with citizen intake, pricing calculation, and document OCR."
3. Negative Constraints: "NEVER solve CAPTCHAs. NEVER store raw biometric images. NEVER fabricate bank transaction success."
4. Fallback Protocol: "If a required API key or service is unavailable, inform the user honestly and halt."`,
        keyTakeaway: 'Negative constraints must be explicitly stated. Models follow direct prohibitions better than vague guidelines.'
      }
    ],
    quizQuestions: [
      {
        question: 'Why does Chain-of-Thought (CoT) prompting improve complex reasoning accuracy?',
        options: [
          'It increases model parameter count during the turn',
          'It gives the model intermediate token compute space to process sub-problems sequentially',
          'It slows down server fan speed',
          'It deletes the conversation history'
        ],
        correctIndex: 1,
        explanation: 'CoT allows the model to compute intermediate reasoning tokens before arriving at the final conclusion.'
      },
      {
        question: 'Which delimiter is recommended to isolate few-shot examples and avoid prompt injection?',
        options: ['Single space', 'XML tags like <example>...</example>', 'No delimiter needed', 'Random emojis'],
        correctIndex: 1,
        explanation: 'XML tags provide unambiguous structural boundaries that modern LLMs parse reliably.'
      }
    ],
    practicalExercise: {
      title: 'Few-Shot JSON Schema Parser Lab',
      instructions: [
        '1. Author a system prompt that parses unstructured user grievances into a JSON schema.',
        '2. Provide 3 few-shot examples with edge cases (e.g. missing phone numbers, ambiguous names).',
        '3. Test with an adversarial input containing malicious prompt injection instructions.'
      ],
      expectedOutcome: 'Model outputs 100% valid JSON conforming to the schema while neutralizing the injection attack.'
    }
  },

  'CRS-AI-101-M3': {
    id: 'CRS-AI-101-M3',
    courseId: 'CRS-AI-101',
    moduleNumber: 3,
    title: 'Module 3: Multi-Agent Systems & Tool Calling',
    titleHi: 'मॉड्यूल 3: मल्टी-एजेंट सिस्टम्स एवं टूल कॉलिंग ऑर्केस्ट्रेशन',
    estimatedMinutes: 40,
    level: 'Advanced',
    overview: 'Learn function calling, JSON Schema declarations, ReAct loops, autonomous coordinator-worker topologies, tool execution security, and human-in-the-loop approvals.',
    overviewHi: 'फंक्शन कॉलिंग, टूल डिक्लेरेशन, ReAct लूप्स, सुपरवाइजर-वर्कर टोपोलॉजी, टूल सुरक्षा और मानवीय अनुमोदन (HITL) का संपूर्ण अध्ययन।',
    sections: [
      {
        heading: '1. Function Calling & OpenAPI Tool Declarations',
        headingHi: '1. फंक्शन कॉलिंग एवं टूल डिक्लेरेशन संरचना',
        content: `Function Calling turns an LLM into an intelligent reasoning engine that chooses which tools to execute and what arguments to supply.
        
Workflow:
1. Client sends user query alongside an array of tool schemas (Name, Description, Parameters JSON Schema).
2. The LLM evaluates if a tool is needed. If yes, it pauses text generation and returns a structured tool_calls object: { name: "fetch_bill", arguments: { consumerId: "10029" } }.
3. The host client executes the actual API/database query.
4. The client returns tool output as a tool response message.
5. The LLM synthesizes the final user-facing response using the verified tool output.`,
        codeSnippet: `// Standard Tool Schema Declaration
{
  "name": "check_aadhaar_verhoeff",
  "description": "Validates 12-digit Indian Aadhaar number using Dihedral D5 Verhoeff checksum algorithm.",
  "parameters": {
    "type": "object",
    "properties": {
      "aadhaarNumber": {
        "type": "string",
        "description": "12-digit clean UID without spaces"
      }
    },
    "required": ["aadhaarNumber"]
  }
}`,
        keyTakeaway: 'The LLM never calls external APIs directly; it generates structured JSON arguments for your client backend to execute.'
      },
      {
        heading: '2. Multi-Agent Coordination Topologies',
        headingHi: '2. मल्टी-एजेंट समन्वय टोपोलॉजी (Supervisor & Swarm)',
        content: `Complex enterprise applications require specialized autonomous agents working in concert:
        
• Supervisor / Coordinator Pattern: A central router agent analyzes incoming requests and dispatches sub-tasks to specialized subagents (e.g. Document Scrutiny Agent, Dynamic BoQ Quote Agent, Legal Desk Advisor).
• Swarm / Peer Collaboration: Agents communicate via a shared message board or pub/sub bus without a single point of failure.
• State Handoff: Ensuring conversation state, session tokens, and verified facts transfer seamlessly between agents without hallucinating duplicates.`,
        keyTakeaway: 'Divide complex enterprise responsibilities across dedicated single-purpose agents rather than overloading one monolithic prompt.'
      },
      {
        heading: '3. Human-in-the-Loop (HITL) Governance & Financial Safety',
        headingHi: '3. ह्यूमन-इन-द-लूप (HITL) गवर्नेंस एवं वित्तीय सुरक्षा',
        content: `Autonomous AI agents must NEVER execute irreversible financial or legal actions without explicit human approval.
        
Governance Tiers in ADCS Quantum AI:
• READ: Agent queries read-only status (e.g., checking wallet balance or tracking courier). Auto-approved.
• RECOMMEND: Agent suggests next steps (e.g., recommending a CCTV package or advocate). Auto-approved.
• DRAFT: Agent prepares an application or quotation. Requires user review.
• EXECUTE / FINANCIAL DEBIT: Direct wallet transfer, IMPS payout, or legal case filing. REQUIRES EXPLICIT USER PIN / OTP CONFIRMATION.`,
        keyTakeaway: 'Enforce programmatic gates that prevent AI models from committing financial transactions autonomously.'
      }
    ],
    quizQuestions: [
      {
        question: 'Does an LLM execute the API code directly during a tool call?',
        options: [
          'Yes, the model runs the python script inside its neural network',
          'No, the model generates the JSON arguments and pauses; the client host executes the tool and returns the result',
          'Yes, but only if connected via Bluetooth',
          'The model emails the user the code'
        ],
        correctIndex: 1,
        explanation: 'Function calling is a structured contract where the model determines the arguments, and the client application securely executes the tool.'
      },
      {
        question: 'Under ADCS Quantum AI Governance, which tier requires mandatory user OTP/PIN approval?',
        options: ['READ', 'RECOMMEND', 'DRAFT', 'EXECUTE / FINANCIAL DEBIT'],
        correctIndex: 3,
        explanation: 'Irreversible financial settlements and legal filings strictly require explicit human authorization.'
      }
    ],
    practicalExercise: {
      title: 'Multi-Agent Tool Orchestration Simulation',
      instructions: [
        '1. Define two tools: `calculate_boq_quote` and `verify_pan_format`.',
        '2. Simulate an incoming query asking to verify a PAN number and calculate an estimate.',
        '3. Inspect the tool_call array generated by the agent and assert argument validity.'
      ],
      expectedOutcome: 'Agent correctly issues parallel tool calls with validated schemas and formats final bilingual summary.'
    }
  },

  'CRS-AI-101-M4': {
    id: 'CRS-AI-101-M4',
    courseId: 'CRS-AI-101',
    moduleNumber: 4,
    title: 'Module 4: Autonomous Coding & API Orchestration',
    titleHi: 'मॉड्यूल 4: ऑटोनॉमस कोडिंग, गिट वर्कफ़्लो एवं API एकीकरण',
    estimatedMinutes: 45,
    level: 'Advanced',
    overview: 'Learn the complete lifecycle of autonomous agentic coding: codebase indexing, test-driven development (TDD), differential patch editing, git version control, and production builds.',
    overviewHi: 'सॉफ्टवेयर डेवलपमेंट का स्वायत्त चक्र: कोडबेस इंडेक्सिंग, टेस्ट-ड्रिवन डेवलपमेंट (TDD), डिफ़रेंशियल पैच एडिटिंग, गिट वर्शन कंट्रोल और प्रोडक्शन बिल्ड।',
    sections: [
      {
        heading: '1. Codebase Mental Model & Context Assembly',
        headingHi: '1. कोडबेस मेंटल मॉडल एवं कॉन्टेक्स्ट संकलन',
        content: `Before an AI agent can modify production code safely, it must construct a precise mental model of the workspace.
        
Key Steps:
1. Repository Architecture Inspection: Scanning directory trees, package.json dependencies, and routing tables.
2. Type System Alignment: Reading TypeScript interfaces (.d.ts / types/index.ts) to establish exact variable contracts.
3. Test Harness Execution: Running existing unit and integration test suites prior to editing to capture baseline state.`,
        keyTakeaway: 'Never guess file contents or function signatures. Always read the authoritative interface definition first.'
      },
      {
        heading: '2. Differential Patch Editing & Contiguous Block Rules',
        headingHi: '2. डिफ़रेंशियल पैच एडिटिंग एवं सटीक स्ट्रिंग प्रतिस्थापन',
        content: `Modern AI coding agents use differential editing tools rather than overwriting entire thousand-line source files.
        
Rules for Flawless File Edits:
• Exact Target Match: The Target block must match the existing file text verbatim, including leading spaces, newlines, and indentation.
• Scope Isolation: Group related edits into single contiguous replacements to avoid race conditions.
• Incremental Verification: Run TypeScript compilation (\`tsc --noEmit\`) immediately after file modifications to catch syntax errors instantly.`,
        keyTakeaway: 'Small, precise, verifiable surgical edits prevent regression and maintain codebase stability.'
      },
      {
        heading: '3. Test-Driven Development (TDD) & Automated Regression Auditing',
        headingHi: '3. टेस्ट-ड्रिवन डेवलपमेंट (TDD) एवं स्वचालित रिग्रेशन ऑडिट',
        content: `In an enterprise environment like ADCS, any newly authored endpoint or workflow must be guarded by automated regression tests.
        
Lifecycle:
1. Write the Test Case First: Define expected input, status codes, and JSON response shapes.
2. Implement the Backend Route / UI Component: Build the feature to satisfy the test specifications.
3. Run the Full Suite: Execute multi-suite runners (Unit Tests, CSC Workflows, Master 15 Launch Gates).
4. Atomic Git Commits: Commit passing code with descriptive semantic messages (e.g. feat(enterprise-2.0): ...).`,
        keyTakeaway: 'A feature is not complete when code is written; it is complete only when automated tests pass 100%.'
      }
    ],
    quizQuestions: [
      {
        question: 'Why should an agent run existing test suites before making code changes?',
        options: [
          'To drain computer battery',
          'To establish an authoritative baseline and ensure no pre-existing regressions exist',
          'To delete the git repository',
          'To format the hard drive'
        ],
        correctIndex: 1,
        explanation: 'Establishing a baseline verifies that tests pass prior to changes, ensuring any new failure is immediately detected and attributable.'
      }
    ],
    practicalExercise: {
      title: 'Full-Stack Endpoint TDD Implementation',
      instructions: [
        '1. Write an automated test asserting HTTP 200 on `/api/services/health`.',
        '2. Add the endpoint in Express with proper JSON response headers.',
        '3. Verify that `npm test` passes and production build compiles with 0 errors.'
      ],
      expectedOutcome: '100% passing test assertion and clean git commit.'
    }
  },

  // =========================================================================
  // COURSE 2: CRS-COMP-102 (ADCS Computer Pro & Windows Operating Fundamentals)
  // =========================================================================
  'CRS-COMP-102-M1': {
    id: 'CRS-COMP-102-M1',
    courseId: 'CRS-COMP-102',
    moduleNumber: 1,
    title: 'Module 1: Computer Hardware & Peripherals',
    titleHi: 'मॉड्यूल 1: कंप्यूटर हार्डवेयर एवं पेरिफेरल डिवाइसेस',
    estimatedMinutes: 30,
    level: 'Beginner',
    overview: 'Essential computer hardware architecture: CPU cores, RAM speeds, NVMe SSD storage, USB-C/Ethernet ports, biometric RD scanners, thermal printers, and UPS power backups.',
    overviewHi: 'कंप्यूटर हार्डवेयर आर्किटेक्चर: CPU, रैम (RAM), NVMe SSD स्टोरेज, बायोमेट्रिक RD स्कैनर, थर्मल प्रिंटर, पोर्ट्स और UPS पावर बैकअप का संपूर्ण अध्ययन।',
    sections: [
      {
        heading: '1. Core Processing Units: CPU, RAM & High-Speed Storage',
        headingHi: '1. मुख्य प्रोसेसिंग इकाइयां: CPU, रैम एवं स्टोरेज',
        content: `A modern digital service workstation requires balanced hardware components:
        
• CPU (Processor): The brain of the computer (e.g. Intel Core i5/i7 or AMD Ryzen 5/7). Multi-core architecture (e.g., 6 cores / 12 threads) allows running the browser, biometric RD services, and document scanning software simultaneously without lagging.
• RAM (Random Access Memory): Fast volatile memory (minimum 8GB, recommended 16GB DDR4/DDR5). When you open multiple portal tabs (DigiPay, Sarathi, e-District), they reside in RAM.
• Storage (NVMe M.2 SSD vs HDD): Modern solid-state drives (SSDs) read at 3,500+ MB/s compared to mechanical hard drives (HDDs) at 120 MB/s. Workstations with SSDs boot Windows in under 12 seconds and launch portal applications instantly.`,
        keyTakeaway: 'Workstations running digital center operations must prioritize an NVMe SSD and minimum 8GB RAM to prevent client timeout during biometric capture.'
      },
      {
        heading: '2. Service Center Peripherals: RD Scanners & Thermal Printers',
        headingHi: '2. केंद्र उपकरण: बायोमेट्रिक RD स्कैनर एवं थर्मल प्रिंटर',
        content: `Akul Dravin Digital Services Kendras utilize specialized statutory hardware:
        
• Biometric Registered Devices (L0 & L1 RD Service):
  - Mantra MFS100 / Morpho MSO 1300 E3: Optical fingerprint sensors compliant with UIDAI standards.
  - L1 Devices: Contain secure cryptographic hardware (TEE) that encrypts the biometric capture internally before sending it over USB.
• Thermal Receipt Printers:
  - 58mm or 80mm direct thermal printers that require no ink or toner (uses heat-sensitive paper). Essential for instant DigiPay cash withdrawal slips and electricity bill receipts.
• Multi-Function Laser Printers:
  - High-speed B&W / Color printing, flatbed scanning (300 DPI for Aadhaar/PAN upload), and automated document feeder (ADF) for multi-page affidavits.`,
        keyTakeaway: 'Always install vendor-certified RD Service drivers and ensure USB root hubs do not enter power-saving sleep mode.'
      },
      {
        heading: '3. Hardware Ports, Cabling & UPS Power Protection',
        headingHi: '3. कनेक्टिविटी पोर्ट्स, वायरिंग एवं UPS पावर सुरक्षा',
        content: `• USB-A 3.2 (Blue Port): Connect high-bandwidth biometric scanners and webcams here for stable 5Gbps throughput.
• RJ-45 Gigabit Ethernet: High-speed wired internet connection (preferred over Wi-Fi for banking terminals to eliminate wireless packet drop).
• Uninterruptible Power Supply (UPS): Sudden power outages can corrupt transaction ledgers or lock banking switch sessions. A 600VA - 1000VA UPS provides 15 to 30 minutes of clean backup power, protecting hardware from surges.`,
        keyTakeaway: 'Never connect biometric banking scanners through unpowered USB extension hubs; plug directly into motherboard rear ports.'
      }
    ],
    quizQuestions: [
      {
        question: 'What is the primary operational advantage of an NVMe SSD over an HDD in a digital service workstation?',
        options: [
          'It uses magnetic spinning discs',
          'It provides up to 30x faster read/write speeds, enabling instant boot and zero application lag',
          'It makes the computer heavier',
          'It requires daily oil lubrication'
        ],
        correctIndex: 1,
        explanation: 'NVMe solid-state drives communicate directly via PCIe lanes, delivering speeds upwards of 3,500 MB/s compared to 120 MB/s for mechanical HDDs.'
      },
      {
        question: 'Why are UIDAI L1 biometric devices more secure than legacy L0 devices?',
        options: [
          'L1 devices are made of gold',
          'L1 devices encrypt biometric data within secure hardware (TEE) before USB transmission',
          'L1 devices do not require electricity',
          'L1 devices take photos of the room'
        ],
        correctIndex: 1,
        explanation: 'UIDAI L1 certification mandates hardware-level cryptographic key isolation and biometric encryption within the sensor itself.'
      }
    ],
    practicalExercise: {
      title: 'Workstation Diagnostic & Peripheral Check',
      instructions: [
        '1. Open Device Manager (`devmgmt.msc`) on Windows.',
        '2. Locate the connected Biometric RD Scanner under "Universal Serial Bus controllers" or "Biometric Devices".',
        '3. Inspect USB Root Hub Power Management properties and uncheck "Allow the computer to turn off this device to save power".'
      ],
      expectedOutcome: 'Guaranteed uninterrupted USB power delivery for DigiPay banking terminals.'
    }
  },

  'CRS-COMP-102-M2': {
    id: 'CRS-COMP-102-M2',
    courseId: 'CRS-COMP-102',
    moduleNumber: 2,
    title: 'Module 2: Windows 11 Navigation & File Management',
    titleHi: 'मॉड्यूल 2: विंडोज़ 11 नेविगेशन एवं फ़ाइल प्रबंधन',
    estimatedMinutes: 30,
    level: 'Beginner',
    overview: 'Master File Explorer, hierarchical folder structures, file extensions, keyboard shortcuts, Task Manager, Command Prompt diagnostics, and Windows Security.',
    overviewHi: 'विंडोज़ 11 फ़ाइल एक्सप्लोरर, फ़ोल्डर संरचना, एक्सटेंशन, कीबोर्ड शॉर्टकट, टास्क मैनेजर और सुरक्षा सेटिंग्स का व्यावहारिक अध्ययन।',
    sections: [
      {
        heading: '1. Hierarchical Directory Structure & File Extensions',
        headingHi: '1. फ़ोल्डर संरचना एवं फ़ाइल एक्सटेंशन्स',
        content: `Clean file organization is the foundation of a professional digital service center:
        
• Standard Directory Layout for ADCS Kendras:
  - C:\\ADCS_Vault\\Clients\\{Aadhaar_Last4}_{CitizenName}\\
  - Separate folders for: 01_Identity_Proof, 02_Income_Caste_Docs, 03_Receipts_Generated
• Essential File Extensions & Formats:
  - .pdf: Standard portable document format for government applications and land records.
  - .jpg / .jpeg: Citizen passport photograph format (typically compressed to under 50 KB, 3.5cm x 4.5cm).
  - .png: Transparent digital signatures (typically under 20 KB).
  - .csv / .xlsx: Tabular passbook and transaction reconciliation sheets.`,
        keyTakeaway: 'Always enable "File name extensions" in Windows Explorer to avoid confusing executable files with documents.'
      },
      {
        heading: '2. Professional Windows Power-User Shortcuts',
        headingHi: '2. महत्वपूर्ण कीबोर्ड शॉर्टकट्स',
        content: `Mastering keyboard shortcuts accelerates customer intake by 40%:
        
• Win + E: Instantly open File Explorer.
• Win + Shift + S: Snipping Tool for capturing screen receipts and application acknowledgement numbers.
• Win + V: Multi-item Clipboard History (allows pasting previously copied Aadhaar, mobile, and IFSC numbers without re-typing).
• Ctrl + Shift + Esc: Direct shortcut to Task Manager (to terminate frozen browser tabs or check RAM consumption).
• Win + D: Instantly minimize all windows and display the desktop.
• Win + L: Lock computer screen when stepping away from the counter (Statutory DPDP Security Requirement).`,
        keyTakeaway: 'Use Win + V for clipboard history and Win + L whenever leaving your workstation unattended.'
      },
      {
        heading: '3. Essential Diagnostic Commands (CMD & PowerShell)',
        headingHi: '3. महत्वपूर्ण डायग्नोस्टिक कमांड्स',
        content: `When a portal or scanner fails, use built-in CLI tools to diagnose:
        
• ipconfig /all: Displays IP address, subnet mask, default gateway, and DNS servers.
• ping digitalseva.csc.gov.in: Tests network latency and packet loss to government servers.
• netstat -ano: Inspects active port bindings (e.g. checking if Mantra RD Service is listening on 127.0.0.1:11100).
• services.msc: Manages background Windows services (allows restarting "Mantra AVDM" or "Morpho Smart Service" if device hangs).`,
        keyTakeaway: 'When biometric scanner is not responding, open services.msc and restart the vendor RD Service.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which Windows shortcut opens the multi-item clipboard history?',
        options: ['Ctrl + C', 'Ctrl + V', 'Win + V', 'Win + P'],
        correctIndex: 2,
        explanation: 'Win + V opens the Windows 10/11 clipboard history, allowing selection from multiple copied items.'
      },
      {
        question: 'Which utility is used to restart frozen background biometric RD services in Windows?',
        options: ['Paint', 'services.msc', 'Notepad', 'Calculator'],
        correctIndex: 1,
        explanation: 'services.msc opens the Windows Services Management Console where vendor RD services can be restarted.'
      }
    ],
    practicalExercise: {
      title: 'Citizen Document Archive Setup',
      instructions: [
        '1. Create a structured client folder on the desktop.',
        '2. Enable "File name extensions" and "Hidden items" in File Explorer View options.',
        '3. Use Win + Shift + S to take an acknowledgment capture and save it as a high-resolution PNG.'
      ],
      expectedOutcome: 'Standardized client digital filing system conforming to statutory audit protocols.'
    }
  },

  'CRS-COMP-102-M3': {
    id: 'CRS-COMP-102-M3',
    courseId: 'CRS-COMP-102',
    moduleNumber: 3,
    title: 'Module 3: Internet & Safe Digital Banking',
    titleHi: 'मॉड्यूल 3: इंटरनेट नेटवर्किंग एवं सुरक्षित डिजिटल बैंकिंग',
    estimatedMinutes: 35,
    level: 'Intermediate',
    overview: 'Internet protocols (HTTPS/SSL), DNS resolution, Indian payment architecture (UPI, AePS, IMPS, BBPS), cybersecurity hygiene, phishing defense, and DPDP 2025 compliance.',
    overviewHi: 'इंटरनेट प्रोटोकॉल, HTTPS एन्क्रिप्शन, भारतीय भुगतान प्रणालियां (UPI, AePS, IMPS, BBPS), साइबर सुरक्षा एवं धोखाधड़ी से बचाव।',
    sections: [
      {
        heading: '1. Web Security: HTTPS, SSL/TLS & Digital Certificates',
        headingHi: '1. वेब सुरक्षा: HTTPS एवं SSL/TLS एन्क्रिप्शन',
        content: `When conducting digital banking or government operations, data travels across public networks:
        
• HTTP vs HTTPS: Unencrypted HTTP (Port 80) transmits credentials in plain text. HTTPS (Port 443) encrypts all communication using Transport Layer Security (TLS 1.3).
• The Padlock Icon: Confirms the website has a valid SSL certificate signed by a recognized Certificate Authority (CA) and matches the official domain.
• Phishing Awareness: Fraudulent sites mimic official portals (e.g., using "csc-gov-in.fake.com" instead of "csc.gov.in"). Always verify the exact Top-Level Domain (TLD) before entering operator credentials.`,
        keyTakeaway: 'Never enter citizen Aadhaar or banking credentials on any website lacking HTTPS and a valid domain certificate.'
      },
      {
        heading: '2. Indian Payment Rails: UPI, IMPS, AePS & BBPS Architecture',
        headingHi: '2. भारतीय भुगतान प्रणालियां: UPI, IMPS, AePS एवं BBPS',
        content: `National Payments Corporation of India (NPCI) operates the national settlement rails:
        
• UPI (Unified Payments Interface): Real-time 24x7 payment system linking bank accounts to Virtual Payment Addresses (VPAs). Uses two-factor authentication (Device Binding + MPIN).
• IMPS (Immediate Payment Service): 24x7 interbank fund transfer via Account Number + IFSC. Used by ADCS Kendra for instant VLE wallet bank payouts.
• AePS (Aadhaar Enabled Payment System): Biometric financial inclusion channel allowing Cash Withdrawal, Balance Enquiry, and Mini Statements using 12-digit Aadhaar UID + Fingerprint authentication.
• BBPS (Bharat Bill Payment System): One-stop ecosystem for electricity, water, gas, DTH, and FASTag recharges with instant confirmation.`,
        keyTakeaway: 'AePS transactions require verified Verhoeff checksum calculation and strict operator biometric authorization.'
      },
      {
        heading: '3. Cyber Fraud Prevention & Screen-Sharing Traps',
        headingHi: '3. साइबर धोखाधड़ी से बचाव एवं महत्वपूर्ण सुरक्षा नियम',
        content: `VLEs and Cyber Café operators are primary targets for cyber fraudsters:
        
• Remote Screen-Sharing Scam: Fraudsters posing as "Bank Helpdesk" ask operators to install AnyDesk, TeamViewer, or QuickSupport to "fix" biometric devices. This grants full remote control, allowing thieves to drain wallets. ADCS official support NEVER asks for remote screen control without ticket authentication.
• OTP Discipline: Never share OTPs over the phone or WhatsApp with anyone claiming to be a district manager or bank officer.
• Biometric Hygiene: Never authenticate a withdrawal if the customer is not physically present at your counter.`,
        keyTakeaway: 'Never install remote desktop software on banking computers. Official support will never request your passwords or OTPs.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which organization operates UPI, AePS, and BBPS in India?',
        options: ['SEBI', 'NPCI (National Payments Corporation of India)', 'ISRO', 'TRAI'],
        correctIndex: 1,
        explanation: 'NPCI is the specialized umbrella organization for operating retail payments and settlement systems in India.'
      },
      {
        question: 'What is the danger of installing software like AnyDesk or TeamViewer on a digital banking terminal?',
        options: [
          'It cleans the computer monitor',
          'It allows remote attackers to view and control your desktop, potentially stealing wallet funds',
          'It speeds up the internet connection',
          'It adds more printer ink'
        ],
        correctIndex: 1,
        explanation: 'Remote access software grants complete control of your workstation to outsiders; fraudsters exploit this to drain digital wallets.'
      }
    ],
    practicalExercise: {
      title: 'Digital Certificate & Domain Verification Test',
      instructions: [
        '1. Open the browser and visit `https://akuldravin.com` or `http://127.0.0.1:3000`.',
        '2. Inspect the SSL certificate details, validity dates, and issuing CA.',
        '3. Verify that the URL bar indicates secure encryption.'
      ],
      expectedOutcome: 'Proof of secure end-to-end TLS channel establishment.'
    }
  },

  'CRS-COMP-102-M4': {
    id: 'CRS-COMP-102-M4',
    courseId: 'CRS-COMP-102',
    moduleNumber: 4,
    title: 'Module 4: MS Office Suite Fundamentals',
    titleHi: 'मॉड्यूल 4: एमएस ऑफिस सुइट (Word, Excel, PowerPoint) दक्षता',
    estimatedMinutes: 35,
    level: 'Beginner',
    overview: 'Professional mastery of MS Word for government formatting & affidavits, MS Excel formulas for daily VLE ledger reconciliation, and PowerPoint presentation creation.',
    overviewHi: 'सरकारी दस्तावेज़ व हलफ़नामा निर्माण हेतु MS Word, दैनिक लेजर व कमीशन मिलान हेतु MS Excel फॉर्मूला एवं प्रजेंटेशन का संपूर्ण अभ्यास।',
    sections: [
      {
        heading: '1. MS Word: Official Document & Affidavit Formatting',
        headingHi: '1. MS Word: हलफ़नामा एवं सरकारी पत्राचार प्रारूप',
        content: `Citizens frequently visit digital centers for affidavits, legal agreements, and job applications:
        
• Affidavit & Agreement Margins: Set Top Margin to 2.5 inches (or 6.5 cm) when printing on Indian Non-Judicial e-Stamp papers to avoid overlapping the statutory treasury banner.
• Typography & Styling: Use standard fonts like Times New Roman, Arial, or Mangal (Unicode Hindi). Set line spacing to 1.15 and paragraph alignment to Justified (Ctrl + J) for clean professional borders.
• Tables & Signatures: Insert clean 2-column signature blocks for "First Party (Deponent)" and "Second Party / Notary Public".`,
        keyTakeaway: 'When drafting legal affidavits on e-Stamp papers, always leave a 2.5-inch top margin for the statutory watermark banner.'
      },
      {
        heading: '2. MS Excel: Formulas & Daily VLE Transaction Reconciliation',
        headingHi: '2. MS Excel: फॉर्मूले एवं दैनिक कमीशन व लेजर मिलान',
        content: `Managing daily cash flow and operator commissions requires essential spreadsheet formulas:
        
• Essential Formulas:
  - =SUM(D2:D100): Calculates total daily collection across all services.
  - =COUNTIF(C2:C100, "AEPS"): Counts the exact number of AEPS withdrawals completed today.
  - =IF(E2>=2000, E2*0.005, 5): Implements dynamic commission calculations.
  - =VLOOKUP(A2, ServicesCatalog, 3, FALSE): Looks up the customer selling price given a service code.
• Pivot Tables: Group transactions by Service Category (Government, Travel, Banking) to analyze profit margins instantly.
• Data Validation: Restrict cell entries to dropdown lists (e.g., "Cash", "UPI", "Wallet") to prevent typos.`,
        codeSnippet: `// Sample Daily VLE Ledger Template Formula:
Col A: Transaction ID (e.g. TXN-101)
Col B: Service Name (e.g. PAN Card)
Col C: Customer Paid (e.g. ₹150)
Col D: Statutory Govt Fee (e.g. ₹107)
Col E: Operator Margin (=C2-D2 -> ₹43)
Total Daily Net Profit: =SUM(E2:E50)`,
        keyTakeaway: 'Automate daily counter close using SUM, IF, and Pivot Tables to reconcile physical cash drawer with digital wallet balance.'
      },
      {
        heading: '3. Printing, Exporting to PDF & Scaling Control',
        headingHi: '3. प्रिंटिंग, PDF एक्सपोर्ट एवं पेज स्केलिंग',
        content: `• Save As PDF (F12): Always export completed Word documents and Excel sheets to PDF before sharing or printing to freeze formatting.
• Excel "Fit All Columns on One Page": In the Print dialog, select "Fit Sheet on One Page" to prevent tables from awkwardly splitting across two pages.
• Orientation (Portrait vs Landscape): Use Portrait for single-column letters and Landscape for multi-column attendance registers or BoQ estimates.`,
        keyTakeaway: 'Always preview in PDF before printing to avoid wasted paper and toner cartridge ink.'
      }
    ],
    quizQuestions: [
      {
        question: 'What top margin is recommended when printing affidavits on Indian Non-Judicial e-Stamp paper?',
        options: ['0.5 inch', '1.0 inch', '2.5 inches (to clear the stamp banner)', '5.0 inches'],
        correctIndex: 2,
        explanation: 'Non-Judicial e-Stamp papers have a large top treasury banner; a 2.5-inch top margin prevents overlapping print.'
      },
      {
        question: 'Which Excel formula counts how many transactions belong to the "AEPS" category?',
        options: ['=COUNT(A1:A10)', '=COUNTIF(C2:C100, "AEPS")', '=SUM(C2:C100)', '=AVERAGE("AEPS")'],
        correctIndex: 1,
        explanation: '=COUNTIF(range, criteria) counts cells matching a specific condition like "AEPS".'
      }
    ],
    practicalExercise: {
      title: 'VLE Daily Business Ledger Build',
      instructions: [
        '1. Create a 5-column Excel sheet with Date, Customer, Service, Customer Fee, and VLE Commission.',
        '2. Enter 5 sample transactions and use `=SUM()` to calculate total daily revenue.',
        '3. Export the finished sheet as a clean, single-page landscape PDF.'
      ],
      expectedOutcome: 'A complete, reusable automated accounting ledger for counter operations.'
    }
  }
};
