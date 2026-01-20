

## Education

**Master of Engineering, Electrical and Computer Engineering**  
University of Ottawa, 2023–2025 | GPA: 9.125/10

**Bachelor of Engineering, Electrical Engineering and Automation**  
Northeast Electric Power University, 2019–2023 | GPA: 87.2/100

---

## Experience

**Service Router Test Platform Dev Student**, Nokia, Ottawa  
*Apr 2024 – Dec 2024*

- Assist Ethernet and Optical teams to validate new hardware and software in a Linux-based regression environment.
- Developed and executed **3** test cases for Optical Transceivers and Media Dependent Adapters.
- Conducted **1,078** regression tests on **QSFP28 - 4x25G/100G PSM4 Optical Transceiver**, ensuring reliability and compliance.
- Identified and reported **7** critical embedded software bugs, enhancing system stability.
- Verified **8** bug fixes across 3 embedded software images.
- Optimized GASH code by fixing bugs and improving functionality, streamlining testing workflows.
- Worked extensively with CI/CD pipelines for automated testing and deployment.

---
## Technical Skills

**Programming & Scripting:** Python, Java, TCL, JavaScript, TypeScript, BASH, SQL, MATLAB

**Testing Frameworks & Tools:** PyTest, JUnit, Selenium, Appium, ACTS, Z3, METtester, Postman, JIRA

**Networking & Systems:** Optical Networks, Optical Transceivers, Ethernet, TCP/IP, Ixia Traffic Generator, BER Analysis, Link Budget Analysis

**Machine Learning & Data Science:** Scikit-learn, XGBoost, Keras, Pandas, NumPy, Matplotlib

**Frontend & Web Development:** React, Vite, Tailwind CSS, Responsive Design, GitHub Pages

**Engineering & Simulation Software:** MATLAB Simulink, SolidWorks, CAD, Proteus, MATPOWER

**Lab Equipment:** BERT, Optical Spectrum Analyzer, Oscilloscope, Function Generator, Multimeter



---

## Projects

### WeOrganizer: AI-Driven B2B Content Aggregation Platform  
**Date:** 2026.01 (Design & Prototyping Phase)  
**Description:** Conceptualized and designed a B2B SaaS solution that automates the extraction, analysis, and distribution of WeChat Official Account content, enabling Account Managers to deliver personalized market intelligence to clients efficiently.  
**Images:** projects/wechat-gzh-organizer/1.png, projects/wechat-gzh-organizer/2.png, projects/wechat-gzh-organizer/3.png, projects/wechat-gzh-organizer/4.png  
**Key Contributions:** 
* **Product Strategy (0-1):** Defined the product vision and development roadmap, identifying the critical pain point of manual content filtering in B2B sales and proposing an automated "Extract-Analyze-Push" workflow.  
* **AI Application Design:** Architected the functional logic for a dual-model AI system: utilizing **NLP** for structural extraction (keywords/titles) and a **Supervised Learning** model to predict client-article relevance based on historical interaction data.  
* **GenAI Integration:** Designed the "Smart Push" feature, outlining the prompt engineering requirements for LLMs to transform structured JSON data into context-aware, personalized client outreach messages (Email/WeChat).  
* **System Logic & Data Modeling:** Defined the technical specifications and data structures (JSON schemas) for article processing, ensuring seamless data flow between the crawler, the analysis engine, and the frontend dashboard.  
* **UX/UI Prototyping:** Created high-fidelity interactive prototypes and user journey maps to visualize the information architecture, focusing on reducing the cognitive load for managers handling high-volume information streams.  
* **Requirement Management:** Translated complex algorithmic concepts into actionable Product Requirement Documents (PRD), bridging the gap between business needs (client engagement) and technical implementation (machine learning feasibility).  

### [Relationship K-Line: AI-Powered Astrology Compatibility Visualization](https://maxzhangg.github.io/relationship-k-line/)  
**Date:** 2026.01  
**Description:** Developed a client-side astrology visualization web application that quantifies and visualizes romantic compatibility using BaZi (Four Pillars of Destiny) and generative AI.  
**Images:** projects/relationship-k-line/Initial.png, projects/relationship-k-line/Analysis.png
**Key Contributions:**  
- Built a fully client-side application using **React 19**, **TypeScript**, and **Vite**, deployable on **GitHub Pages** without a backend.  
- Implemented **dual-language support (English / Simplified Chinese)** with automatic browser language detection via **Context API**.  
- Integrated **Google Gemini Pro API** to perform AI-driven reasoning over BaZi interactions (clashes, combinations, Ten Gods) and generate year-by-year relationship analysis.  
- Used **lunar-javascript** to calculate **accurate BaZi pillars**, including **True Solar Time** adjustment based on geographic longitude and latitude.  
- Designed stock-market-style **K-Line (Candlestick) charts** and **dual life line charts** using **Recharts** to visualize relationship volatility, trends, and synchronization over time.  
- Added **radar charts** to decompose compatibility across multiple dimensions (communication, values, intimacy, wealth, etc.).  
- Styled responsive dark-mode UI with **Tailwind CSS** and **Lucide React** icons for modern data-visualization aesthetics.  
- Configured **HashRouter** and Vite base paths to ensure stable routing and compatibility with static hosting on GitHub Pages.


### [Tarot Drawing Website with AI Reading](https://maxzhangg.github.io/tarot/)  
**Date:** 2025.07  
**Description:** Developed an interactive Tarot drawing and reading website using React and AI-powered chatbot.  
**Key Contributions:**  
- Used **React** and **Tailwind CSS** to build responsive mobile and desktop layouts with dynamic tarot card drawing.  
- Integrated **DeepSeek API** to enable multi-turn tarot interpretation chats with Markdown rendering support.  
- Implemented deterministic card drawing using **SHA-256 hashing** to ensure reproducibility and fairness.  
- Created a structured **JSON** dataset of 156 tarot cards (upright and reversed meanings) for consistent card logic.  
- Deployed via GitHub Pages and configured routing using **React HashRouter** to ensure compatibility with static hosting.  

---

### [Style Max - Fashion Recommendation Platform](https://maxzhangg.github.io/Style-Max-Demo/)  
**Date:** 2025.05 – 2025.07  
**Description:** Developed as a prototype for the GNG5120 course, Style Max is an AI-powered fashion recommendation platform featuring multi-page interaction and chatbot integration. 
**Images:** projects/style-max/1.png, projects/style-max/2.png, projects/style-max/3.jpeg, projects/style-max/4.png, projects/style-max/5.png,  
**Key Contributions:**  
- Designed a multi-page React application with routes for [**Home**](https://maxzhangg.github.io/Style-Max-Demo/), [**Chat**](https://maxzhangg.github.io/Style-Max-Demo/#/chat), [**Community**](https://maxzhangg.github.io/Style-Max-Demo/#/community), [**Wardrobe**](https://maxzhangg.github.io/Style-Max-Demo/#/wardrobe), and a [**Uniqlo shopping assistant**](https://maxzhangg.github.io/Style-Max-Demo/#/uniqlo).  
- Integrated **DeepSeek API** to power conversational recommendations with Markdown support, multi-turn memory, and real-time streaming.  
- Built custom **chat widget components** to enable consistent AI interactions across pages, including integration with static SingleFile-based HTML content (Uniqlo).  
- Created **desktop-responsive layouts** with Tailwind CSS, unifying UI/UX.  
- Implemented dynamic routing with **HashRouter** and configured **multi-entry Vite builds** for proper static deployment on GitHub Pages.  

---

### [Automated Test Generation with Gen-AI under Pytest](https://github.com/maxzhangg/ai-generated-pytest-for-sorting)  
**Date:** 2025.04  
**Description:** Generated Pytest test cases for Python programs using gen-ai.  
**Key Contributions:**  
- Provided a full suite of **Pytest** test cases for classic sorting algorithms.  
- Tests were automatically generated and manually evaluated to ensure correctness, structural coverage, and robustness.

---

### Movie Recommendation System
**Date:** 2025.03 – 2025.04 
**Description:** Developed a chatbot to recommend movies.  
**Key Contributions:**  
- Used **SpaCy** library for information and named entity extraction.
- Built recommendation system using the **Surprise** library in Python.
- Developed interactive chatbot with **Google Dialogflow**.

---

### MCU-Based Solar Street Light Controller Design
**Date:** 2023.03 – 2023.06  
**Description:**Developed a solar-powered LED street lighting system based on ATmega8 MCU.  
**Key Contributions:**  
- Designed **DC-DC circuit** using **pulse width modulation** for optimized solar charging.
- Implemented protection features such as **short circuit, overload, and automatic recovery mechanisms**.

---

### Harmonic Analysis of Power Systems Using Fourier Transform
**Date:** 2021.11  
**Description:** Performed signal-processing-based harmonic analysis for electrical power systems to evaluate power quality and harmonic distortion.  
**Key Contributions:**  
- Applied **Fast Fourier Transform (FFT)** to analyze harmonic components in power system signals.  
- Used **Hanning window** techniques to reduce spectral leakage and improve frequency-domain accuracy.  
- Evaluated harmonic distortion characteristics to support power quality assessment and system optimization.

---

### Power Flow Calculation for IEEE 57-Bus System
**Date:** 2021.12  
**Description:** Conducted steady-state power flow analysis and system stability evaluation for a standard IEEE 57-bus power network.  
**Key Contributions:**  
- Analyzed **voltage magnitude**, **phase angle**, and **line loading** conditions across the IEEE 57-bus system.  
- Used **MATPOWER** to simulate power flow scenarios and adjust system parameters for stability analysis.  
- Developed **Python scripts** for numerical data processing and engineering visualization of power system results.
