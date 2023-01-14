<div align="center">
<img src="https://i.ibb.co/ThgHqGQ/976d5c4f4522e5a1ae782516b58518f6.jpg" width="150" height="150" border="0" alt="PFP">

# Owo auto farm

### A self discord for farming / battle OWO automatically
</div>

## Features

---

- Owo at random time
- 24/7
- Can be repl.it
- Easy to use / understand

## Installation

- ### Self hosting

  1.  Installation

      Run the following code to clone the repo

      ```sh
      > git clone https://github.com/Paiiss/autofarm.git
      > cd autofarm
      ```

      Run this to install the depencencies

      ```sh
      > npm i
      ```

  2.  Configuration

      Create a new config.json file & use the form below

      ```json
      {
        "id": "",
        "owoId": "",
        "channelId": "",
        "reportChannelId": ""
      }
      ```

      Create a new .env file and put the token inside "" example TOKEN=["78326312"]

      ```env
      TOKEN=["examp1"]
      ```

      If there are more than two tokens, do as below

      ```
      TOKEN=["329712dasda","12323132"]
      ```

  3.  Running

      ```sh
      npm run
      ```

- Repl.it

  1. Login / create a repl.it account and create repl then clone this repository
  2. Create a new config.json file & use the form below
     ```json
     {
       "id": "",
       "owoId": "",
       "channelId": "",
       "reportChannelId": ""
     }
     ```
  3. Open the tool and search for secret, then fill in the key with "TOKEN", for value fill in the token with the format ["token1"] if more than 2 tokens fill in ["token1", "token2", "and other"]
  4. And run repl wait for the bot to run, congratulations your bot has run

### Noted

- For custom 1 selfbot 1 channel

  ```
  TOKEN=["TOKEN1xxxxxChannelId", "TOKEN2xxxxxChannelId"]
  ```
