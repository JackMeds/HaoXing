# HaoXing Platform

HaoXing is a **Novel-to-Audio Drama Converter** built for Chinese storytellers. It ingests long-form fiction, segments and labels character dialogue, then orchestrates multi-voice TTS synthesis to produce distribution-ready audio dramas. The platform bundles the listening site, management console, backend services, and Dockerized ops tooling so teams can ship audio experiences quickly.

## Highlights
- **Novel → Audio Drama pipeline**: Accepts raw novel text, identifies characters/dialogue, and runs batch voice synthesis to generate scripts and audio assets.
- **Voice & casting management**: Bind characters to preconfigured voices, audition variations, and fine-tune before release.
- **Distribution-ready apps**: A consumer-facing site for streaming, a BMS dashboard for curation, and REST APIs that power them both.
- **One-command deployment**: Docker Compose and packaging scripts spin up the full stack locally or on a target server.

> The built-in language models and TTS presets currently focus on **Chinese** content; add-ons can extend the pipeline to other languages.

## Repository Layout
- `HaoXing/` – Vite + Vue frontend that delivers the listening experience
- `HaoXing-BMS/` – Vue-based back-office dashboard for catalog, users, and assets
- `HaoXing-server/` – Node.js/Express API handling text parsing, synthesis, and data access
- `Deployment/` – Docker Compose definition and helper script for building/starting the stack
- `package.sh` – Utility that exports prebuilt Docker images and an installation bundle
- `old/` – Snapshot of the repository’s previous contents for reference

## Prerequisites
- Docker (tested with 24+)
- Docker Compose plugin

## Deploy with Docker
1. Start Docker.
2. Run the deployment script:
   ```bash
   chmod +x Deployment/build.sh
   ./Deployment/build.sh
   ```
   The script builds service images and starts them via Docker Compose. When it finishes you can reach:
   - Frontend: http://localhost:8082
   - BMS Dashboard: http://localhost:8081
   - API: http://localhost:3000
   MySQL listens on port 3306; credentials are defined in `Deployment/docker-compose.yml`.

To stop the stack:
```bash
docker-compose -f Deployment/docker-compose.yml down
```

## Package for Distribution
Create an offline bundle from the repository root:
```bash
chmod +x package.sh
./package.sh
```
This produces prebuilt image archives and `haoxing_release.tar.gz`, which can be transferred to another machine along with an `install.sh` helper.

## Notes for Operators & Developers
- Update environment variables and persistent storage paths in `Deployment/docker-compose.yml` before production rollout.
- Inject API keys (e.g., for voice synthesis) via environment variables—do not hardcode secrets.
- Install dependencies inside `HaoXing/`, `HaoXing-BMS/`, and `HaoXing-server/` (`npm install`, `pnpm install`, etc.) when developing locally.
- To explore multilingual support, extend the parsing logic and voice model configuration in `HaoXing-server`.

For the Chinese README, refer to the project root `README.md`.
