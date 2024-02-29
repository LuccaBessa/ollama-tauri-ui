# OllamaUI

## Overview

OllamaUI is a sleek and efficient desktop application built using Tauri framework, designed to seamlessly connect to Ollama, providing users with a user-friendly interface to interact with the Ollama platform.

## Features

- **Connectivity**: Easily connect to Ollama platform.
- **User Interface**: Intuitive and visually appealing interface for smooth user experience.
- **Efficiency**: Optimized performance for seamless operation.
- **Cross-Platform**: Runs on multiple platforms including Windows, macOS, and Linux.

## Installation

To install OllamaUI, follow these steps:

1. Ensure you have [Ollama](https://ollama.com/download) installed on your system.
2. Set an environment variable called `OLLAMA_ORIGINS` to `https://tauri.localhost`.
3. Download the latest release from the [Releases](https://github.com/LuccaBessa/ollama-tauri-ui/releases) page.
4. Extract the downloaded package to your desired location.
5. Run the executable file to launch the application.

## Usage

1. Upon launching the application, you will be presented with the main interface.
2. If your Ollama server isn't running on the default URL (http://localhost:11434), change the Ollama API Path inside the settings modal.
3. Explore the various features and functionalities offered by OllamaUI.

## Development

If you wish to contribute to the development of OllamaUI, follow these steps to set up your development environment:

1. Clone the repository: `git clone https://github.com/LuccaBessa/ollama-tauri-ui.git`
2. Navigate to the project directory: `cd ollama-tauri-ui`
3. Install dependencies: `bun install`
4. Start the development server: `bun tauri dev`

## Support

For any issues or inquiries, feel free to [open an issue](https://github.com/LuccaBessa/ollama-tauri-ui/issues) on GitHub.
