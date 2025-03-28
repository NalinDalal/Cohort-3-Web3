FROM arm64v8/ubuntu:latest

WORKDIR /app

# Install curl, git, build-essential, and other dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    pkg-config \
    libudev-dev \
    clang \
    libclang-dev \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install Rust with a non-interactive installation
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    . $HOME/.cargo/env && \
    rustc --version # Verify rust is installed

# Add cargo to PATH for subsequent commands
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Solana (ARM64 compatible)
RUN curl -sSf https://release.solana.com/v1.17.16/solana-release-x86_64-unknown-linux-gnu.tar.bz2 | tar -xj -C /usr/local/bin --strip-components=1

# Verify Solana installation
RUN solana --version

# Copy your application code
COPY . .

# Build the Solana program
CMD ["cargo", "build-sbf"]
