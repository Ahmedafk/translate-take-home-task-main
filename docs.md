# Documentation

## Getting started guide

### Prerequisites

1. **Python (version 3.8+)**: You can download Python from the [official website](https://www.python.org/downloads/).
2. **Node.js and npm**: You can download Node.js (which includes npm) from the [official website](https://nodejs.org/en).

### Installation Steps
#### Step 1: Install LibreTranslate

LibreTranslate is the translation engine used in this project. Install it using pip:

```bash
pip install libretranslate
```

#### Step 2: Install Project Dependencies

Navigate to the root directory of your project and install the required Node.js dependencies using npm:

```bash
npm ci
```

#### Step 3: Start the Project

Execute the project using the following command:

```bash 
npm start
```

This command will perform the following actions automatically:

1. **Start LibreTranslate**: Runs `npm run setup:libre-translate` to start a locally hosted instance of LibreTranslate.
2. **Start the API**: Runs `npm run setup:api` to start a locally hosted instance of the API. The API setup includes a check to ensure LibreTranslate is running before the API starts.
3. **Run the Translation Script**: Runs `npm run setup:script` to execute the translation script. The script setup includes a check to ensure the API is running before the script executes.
4. **Timeout Handling**: If the project is not up and running within 10 seconds, a timeout error is thrown and the script is aborted.

## Libraries and packages

### [Express.js](https://www.npmjs.com/package/express)

#### Reason for Use:
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

#### Pros:

- **Simplicity of Setup**: Express.js has a straightforward setup process, making it easy to get a server up and running quickly.
- **Flexibility**: It allows for the creation of RESTful APIs with ease and can be extended with various middleware to handle different tasks.
- **Large Ecosystem**: A vast collection of middleware and plugins is available, which can be easily integrated to extend functionality.
- **Community Support**: A large and active community ensures that issues are quickly addressed and numerous resources are available for learning and troubleshooting.

### [Concurrently](https://www.npmjs.com/package/concurrently)

#### Reason for Use:
The concurrently package allows multiple commands to run simultaneously in the same terminal window. This is useful for batching all setup scripts into one, simplifying the execution process.

#### Pros:

- **Simplified Execution**: Enables running multiple scripts concurrently, reducing the complexity of managing separate terminal windows for each script.
- **Improved Workflow**: Streamlines the development process by allowing developers to run server, build, and watch scripts all at once.

### [Wait-on](https://www.npmjs.com/package/wait-on)

#### Reason for Use:
The wait-on package is used to ensure that dependent scripts wait for their dependencies to be fully set up before executing. It also utilizes integrated timeout functionality to avoid stuck scripts.

#### Pros:

- **Dependency Management**: Ensures that scripts only start executing once their dependencies are ready, preventing errors related to unavailable services.
- **Timeout Functionality**: Helps avoid indefinitely stuck scripts by providing configurable timeouts, improving reliability and stability.

### [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)

#### Reason for Use:
LibreTranslate is used to provide efficient translation services by running locally, which is faster and more cost-effective compared to cloud-based solutions.

#### Pros:

- **Efficiency**: Running locally reduces latency and improves response times compared to remote cloud services.
- **Cost-Effectiveness**: Eliminates the need for paid cloud translation services, reducing operational costs.

### [is-word](https://www.npmjs.com/package/is-word) and [Spellchecker](https://www.npmjs.com/package/spellchecker)

#### Reason for Use:
These packages are used to ensure that the words being translated are correctly spelled and in English.

#### Pros:

- **Accuracy**: Ensures that only correctly spelled words are passed for translation, improving the quality of the output.
- **Language Detection**: Helps verify that the input text is in English, preventing incorrect translations of non-English words.
- **Error Handling**: Identifies misspelled words and can suggest corrections, enhancing the user experience by reducing errors.

## Assumptions and Potential Improvements

1. **Avoided Suggesting Corrections for Misspelling**
    - **Reasoning**: When a word is misspelled and multiple correction suggestions are available, it is not feasible to determine the original intention of the user.
    - **Potential Impact**: Users need to manually correct misspelled words before submitting them for translation

2. **Assumed Starting Language is Always English**
    - **Reasoning**: Simplifies the initial implementation by focusing on a single source language, ensuring consistent behaviour and avoiding the complexity of handling multiple source languages.
    - **Potential Impact**: Users needing translations from other languages must translate to English first before using the service.

3. **Each word is translated individually**
    - **Reasoning**: Simplifies the task by allowing sanitisation of individual words then immediately translating said word
    - **Potential Impact**: Multiple requests need to be made to LibreTranslate, which can be time-consuming.
    - **Potential Improvement**: Implement batching of words into a single request to LibreTranslate, significantly reducing the number of requests and improving overall execution time.