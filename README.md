For those who work hard but still can't make [frida-inject](https://www.npmjs.com/package/frida-inject) work well, especially when using macOS with an M1/M2 CPU, here's a solution to use [frida-cli](https://frida.re/docs/frida-cli/) directly instead of `frida-inject` (and [frida-node](https://www.npmjs.com/package/frida)).

# Setup

Any Node.js version that is able to use [Rollup](https://rollupjs.org) should work.

0. Follow the [documentation](https://frida.re/docs/installation/) and install `frida-cli`.
1. Install [Rollup](https://rollupjs.org) globally.
   * Run the command `npm install --global rollup`.
2. Clone this repository.
3. Open your terminal, navigate to this repository, and run `npm install` to install the required node_modules.

## Why `Rollup`

We use frida-cli like this: `frida xx.exe -l xx.js`. However, it can't deal with `import` and `require` statements inside `xx.js`. Therefore, we need a tool to bundle the `xx.js` file along with all its dependencies into a single file, and that's exactly what `Rollup` is designed for.

# Hack

**To print out the methods and fields of the "TakeDamage" class in the "198X" game:**

```
rollup --config rollup.etest.config.js --bundleConfigAsCjs && frida 198X.exe -l enumerator-test.bundle.js
```

Sample output
```
{
    "address": "0xe8733e0",
    "methods": {
        ...
        "Damage": {
            "address": "0xe887610",
            "jit_address": "0x1082bd20"
        },
        ...
    },
    "fields": {
        ...
        "isPlayerCharacter": {
            "address": "0xe8873d0",
            "offset": "0x1c",
            "type": "boolean"
        }
    }
}
```

**To apply my hacks to "198X":**

```
rollup --config rollup.hack.config.js --bundleConfigAsCjs && frida 198X.exe -l 198X-hacks.bundle.js
```

Sample output:
```
Injected "198X-hacks.bundle.js" into 198X.exe

[*] STARTED PLAYING: The Runaway
[+] Collision! Removing speed loss and disabling wipeout
[+] Collision! Removing speed loss and disabling wipeout
[+] Collision! Removing speed loss and disabling wipeout
[+] Collision! Removing speed loss and disabling wipeout

[*] STARTED PLAYING: Kill Screen
[+] Player took RPG damage: 31, health (before damage) was: 99
[+] Resetting RPG health to: 99
[+] Player took RPG damage: 33, health (before damage) was: 99
[+] Resetting RPG health to: 99

[*] STARTED PLAYING: Credits
```
