import ky from 'ky';

const voices = {
  Angelo:
    's3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json',
  Deedee:
    's3://voice-cloning-zero-shot/e040bd1b-f190-4bdb-83f0-75ef85b18f84/original/manifest.json',
  Jennifer:
    's3://voice-cloning-zero-shot/801a663f-efd0-4254-98d0-5c175514c3e8/jennifer/manifest.json',
  Briggs:
    's3://voice-cloning-zero-shot/71cdb799-1e03-41c6-8a05-f7cd55134b0b/original/manifest.json',
  Samara:
    's3://voice-cloning-zero-shot/90217770-a480-4a91-b1ea-df00f4d4c29d/original/manifest.json',
  Timo: 's3://voice-cloning-zero-shot/677a4ae3-252f-476e-85ce-eeed68e85951/original/manifest.json',
  Dexter:
    's3://voice-cloning-zero-shot/b27bc13e-996f-4841-b584-4d35801aea98/original/manifest.json',
  Inara:
    's3://voice-cloning-zero-shot/adb83b67-8d75-48ff-ad4d-a0840d231ef1/original/manifest.json',
  Arsenio:
    's3://voice-cloning-zero-shot/65977f5e-a22a-4b36-861b-ecede19bdd65/original/manifest.json',
  Miles:
    's3://voice-cloning-zero-shot/29dd9a52-bd32-4a6e-bff1-bbb98dcc286a/original/manifest.json',
  Aaliyah:
    's3://voice-cloning-zero-shot/f6c4ed76-1b55-4cd9-8896-31f7535f6cdb/original/manifest.json',
  Abigail:
    's3://voice-cloning-zero-shot/80ba8839-a6e6-470c-8f68-7c1e5d3ee2ff/abigailsaad/manifest.json',
  Adrian:
    's3://voice-cloning-zero-shot/d99d35e6-e625-4fa4-925a-d65172d358e1/adriansaad/manifest.json',
  Alex: 's3://voice-cloning-zero-shot/72c255f8-00af-4c48-b0de-ad471baa3f52/alexsaad/manifest.json',
  Ariana:
    's3://voice-cloning-zero-shot/f2863f63-5334-4f65-9d30-438feb79c2ec/arianasaad2/manifest.json',
  Arthur:
    's3://voice-cloning-zero-shot/8ca8c44d-fb2b-4269-abca-4e6748a4a61e/arthursaad/manifest.json',
  Atlas:
    's3://voice-cloning-zero-shot/e46b4027-b38d-4d24-b292-38fbca2be0ef/original/manifest.json',
  Audrey:
    's3://voice-cloning-zero-shot/8ceaa707-4141-46c0-a610-4a2014d7ea97/audreysaad/manifest.json',
  Aurora:
    's3://voice-cloning-zero-shot/5b81dc4c-bf98-469d-96b4-8f09836fb500/aurorasaad/manifest.json',
  Autumn:
    's3://voice-cloning-zero-shot/ff414883-0e32-4a92-a688-d7875922120d/original/manifest.json',
  'Ayla (Advertising)':
    's3://voice-cloning-zero-shot/33e6b76a-7554-48fa-9798-2e6823ab0a10/aylaadvertisingsaad/manifest.json',
  'Ayla (Meditation)':
    's3://voice-cloning-zero-shot/f741f871-63ad-4207-8278-907aec4e9e50/aylameditationsaad/manifest.json',
  'Ayla (Narrative)':
    's3://voice-cloning-zero-shot/483ed913-2817-45cb-b1a2-b79d9bfb2cf8/aylanarrativesaad/manifest.json',
  Billy:
    's3://voice-cloning-zero-shot/37e5af8b-800a-4a76-8f31-4203315f8a9e/billysaad/manifest.json',
  Bryan:
    's3://voice-cloning-zero-shot/4c627545-b9c0-4791-ae8e-f48f5475247c/bryansaad/manifest.json',
  Calvin:
    's3://voice-cloning-zero-shot/743575eb-efdc-4c10-b185-a5018148822f/original/manifest.json',
  Casper:
    's3://voice-cloning-zero-shot/1bbc6986-fadf-4bd8-98aa-b86fed0476e9/original/manifest.json',
  Charles:
    's3://voice-cloning-zero-shot/9f1ee23a-9108-4538-90be-8e62efc195b6/charlessaad/manifest.json',
  Chuck:
    's3://voice-cloning-zero-shot/40738a3a-34bb-4ac3-97c5-aed7b31ccf1d/chucksaad/manifest.json',
  Clifton:
    's3://voice-cloning-zero-shot/7447d346-20d5-4939-b43c-bdf17e757e98/cliftonsaad/manifest.json',
  Darnell:
    's3://voice-cloning-zero-shot/2d5053ed-635a-499a-aa66-e85aeaf46d3e/darnellsaad/manifest.json',
  Darrell:
    's3://voice-cloning-zero-shot/f669de94-fea6-4af3-a8ea-193b75bb142b/darrellsaad/manifest.json',
  Dick: 's3://voice-cloning-zero-shot/7b97b543-7877-41b6-86ee-aa1e0b6c110e/dicksaad/manifest.json',
  'Donna (Meditation)':
    's3://peregrine-voices/donna_meditation_saad/manifest.json',
  'Donna (Narrative)': 's3://peregrine-voices/donna_parrot_saad/manifest.json',
  Donovan:
    's3://voice-cloning-zero-shot/07dc6825-4fde-4430-8c86-54ead89e0c88/donovansaad2/manifest.json',
  Dudley:
    's3://voice-cloning-zero-shot/9b559f3c-22e7-4b10-8158-3e11b333751e/dudleysaad/manifest.json',
  Dylan:
    's3://voice-cloning-zero-shot/3a831d1f-2183-49de-b6d8-33f16b2e9867/dylansaad/manifest.json',
  Eileen:
    's3://voice-cloning-zero-shot/b709b944-9256-4578-b9d8-a1ce4d729022/eileensaad/manifest.json',
  Eleanor:
    's3://voice-cloning-zero-shot/d712cad5-85db-44c6-8ee0-8f4361ed537b/eleanorsaad2/manifest.json',
  Erasmo:
    's3://voice-cloning-zero-shot/285900ed-b758-4abb-a4ef-e7295741d97d/erasmosaad/manifest.json',
  Evelyn: 's3://peregrine-voices/evelyn 2 saad parrot/manifest.json',
  Flynn:
    's3://voice-cloning-zero-shot/0b29eab5-834f-4463-b3ad-4e6177d2b145/flynnsaad/manifest.json',
  Fritz:
    's3://voice-cloning-zero-shot/373e9621-167b-4efb-8c62-3167fe5b521d/original/manifest.json',
  Hook: 's3://voice-cloning-zero-shot/261923bd-a10a-4a90-bced-0ce2b0230398/hooksaad/manifest.json',
  Hudson: 's3://peregrine-voices/hudson saad parrot/manifest.json',
  Jordan:
    's3://voice-cloning-zero-shot/d7028403-ceda-4b80-9a4c-1ecd009e6848/jacksaad/manifest.json',
  Joseph:
    's3://voice-cloning-zero-shot/dc23bb38-f568-4323-b6fb-7d64f685b97a/joseph/manifest.json',
  'Larry (Narrative)':
    's3://voice-cloning-zero-shot/92519089-3c97-4f31-8743-ab4f06047b88/larrysaad/manifest.json',
  Leroy:
    's3://voice-cloning-zero-shot/32ae7ca0-634e-4fab-af74-0ec7c663e9da/original/manifest.json',
  Logan:
    's3://voice-cloning-zero-shot/7bad42d5-52be-4687-9a07-7891f31daa6b/logansaad/manifest.json',
  Luna: 's3://voice-cloning-zero-shot/f43cc4b4-b193-4a13-a903-e6b125c3d572/original/manifest.json',
  Mason:
    's3://voice-cloning-zero-shot/a540a448-a9ca-446c-9538-d1bae6c506f1/original/manifest.json',
  Nia: 's3://voice-cloning-zero-shot/831bd330-85c6-4333-b2b4-10c476ea3491/original/manifest.json',
  Nicole:
    's3://voice-cloning-zero-shot/7c38b588-14e8-42b9-bacd-e03d1d673c3c/nicole/manifest.json',
  Nolan:
    's3://voice-cloning-zero-shot/e7e9514f-5ffc-4699-a958-3627151559d9/nolansaad2/manifest.json',
  Nova: 's3://voice-cloning-zero-shot/2a7ddfc5-d16a-423a-9441-5b13290998b8/novasaad/manifest.json',
  Oliver:
    's3://voice-cloning-zero-shot/6c9c01b7-8d38-47ae-8ce5-18a360b26cf3/oliversaad/manifest.json',
  Owen: 's3://voice-cloning-zero-shot/b2da9576-07a4-4e1d-b71f-684f1657516f/owensaad/manifest.json',
  Phoebe:
    's3://voice-cloning-zero-shot/0c4c229f-7f99-4ed9-b904-223c701672b9/phoebesaad/manifest.json',
  Ranger:
    's3://voice-cloning-zero-shot/abc2d0e6-9433-4dcc-b416-0b035169f37e/original/manifest.json',
  Richie:
    's3://voice-cloning-zero-shot/dc90b58b-59a9-4e65-955d-c7620deb2d7a/original/manifest.json',
  Sophia:
    's3://voice-cloning-zero-shot/1f44b3e7-22ea-4c2e-87d0-b4d9c8f1d47d/sophia/manifest.json',
  'Susan (Advertising)':
    's3://voice-cloning-zero-shot/f6594c50-e59b-492c-bac2-047d57f8bdd8/susanadvertisingsaad/manifest.json',
  'Susan (Narrative)':
    's3://voice-cloning-zero-shot/3b74b785-e06e-4a53-a9c4-ebed08a70ef2/susannarrativesaad/manifest.json',
  Waylon:
    's3://voice-cloning-zero-shot/b4a876c1-8730-435e-9595-141799868808/original/manifest.json',
  William:
    's3://voice-cloning-zero-shot/c00f7eb4-fbbd-4a7d-a4c5-ff57e92faf99/williamsaad3/manifest.json',
  'William (Narrative)':
    's3://voice-cloning-zero-shot/688d0200-7415-42b4-8726-e2f5693aaac8/williamnarrativesaad/manifest.json',
  'William (Training)':
    's3://voice-cloning-zero-shot/3b7df114-e269-453a-8dc2-cbbce4c48f48/williamtrainingsaad/manifest.json',
  'Ronel (Conversational)':
    's3://voice-cloning-zero-shot/6c7530a7-a8dc-47d1-a854-37be19f86260/original/manifest.json',
  'Ronel (Narrative)':
    's3://voice-cloning-zero-shot/bf646213-cb3c-447b-9d54-57f2b82298fb/original/manifest.json',
  'Ronel (Podcast)':
    's3://voice-cloning-zero-shot/d64ed0d1-d3d1-403e-b73f-dcb7238765a4/original/manifest.json',
  'Abdo (Conversational)':
    's3://voice-cloning-zero-shot/181231d7-b84e-4845-86bf-1a61bf8784e6/original/manifest.json',
  'Abdo (Narrative)':
    's3://voice-cloning-zero-shot/412c739c-d89e-4402-ac2c-7c107606bcf8/original/manifest.json',
  'Ahmed (Conversational)':
    's3://voice-cloning-zero-shot/6045da2d-8cb1-49b8-ac3a-cd5ddd745506/original/manifest.json',
  'Ahmed (Narrative)':
    's3://voice-cloning-zero-shot/c8731d9b-c16c-4dda-b320-7db983880687/original/manifest.json',
  'Maryem (Conversational)':
    's3://voice-cloning-zero-shot/d44b758a-f3e7-4a7c-af50-02451c7101f4/original/manifest.json',
  'Maryem (Narrative)':
    's3://voice-cloning-zero-shot/b6f988dc-c137-4753-ad11-aa7cb0215e17/original/manifest.json',
  'Shrouk (Conversational)':
    's3://voice-cloning-zero-shot/67c03807-03c3-496b-bcb4-aebd3afa2497/original/manifest.json',
  'Shrouk (Narrative)':
    's3://voice-cloning-zero-shot/4aa345f0-768b-43d8-86c7-10006f73e377/original/manifest.json',
  'Mousmi (Conversational)':
    's3://voice-cloning-zero-shot/1712cfb3-6774-4d2b-8ce0-f4cf94bd57d5/original/manifest.json',
  'Mousmi (Narrative)':
    's3://voice-cloning-zero-shot/d7dfaccf-390a-488c-9a05-d100b7b8cd05/original/manifest.json',
  'Pinaki (Conversational)':
    's3://voice-cloning-zero-shot/ef853fea-b679-4024-9733-b170a6414b6c/original/manifest.json',
  'Pinaki (Narrative)':
    's3://voice-cloning-zero-shot/74370dcd-d229-47b1-8e82-ccc7f29d3ad5/original/manifest.json',
  'Pinaki (Podcast)':
    's3://voice-cloning-zero-shot/e4733a9d-b57e-4770-a87f-70cd91417d83/original/manifest.json',
  'Sourav (Conversational)':
    's3://voice-cloning-zero-shot/5a91a2b3-2a35-4147-aeb5-d0254d60c3b1/original/manifest.json',
  'Sourav (Narrative)':
    's3://voice-cloning-zero-shot/83c50007-c32a-425c-a683-a46268c3749a/original/manifest.json',
  'Tasmia (Conversational)':
    's3://voice-cloning-zero-shot/bf2c2226-e02c-4b8d-96ac-ff1149d95e40/original/manifest.json',
  'Tasmia (Narrative)':
    's3://voice-cloning-zero-shot/da523c41-f801-4d60-b8aa-f0a533ef8cfa/original/manifest.json',
  'Tasmia (Podcast)':
    's3://voice-cloning-zero-shot/c575de57-e52a-4055-bc10-19d749846dac/original/manifest.json',
  'Caroline (Conversational)':
    's3://voice-cloning-zero-shot/3e27747a-b276-472c-91db-542bf88687da/original/manifest.json',
  'Caroline (Narrative)':
    's3://voice-cloning-zero-shot/a7770c38-3246-4ddd-bf58-d8388aa42e65/original/manifest.json',
  'Jacile (Conversational)':
    's3://voice-cloning-zero-shot/356ed0db-cb48-49fd-9a1c-922572a2be0e/original/manifest.json',
  'Jacile (Narrative)':
    's3://voice-cloning-zero-shot/6d093315-8da6-4fd8-a4b9-5446b43ff4c7/original/manifest.json',
  'Jorge (Conversational)':
    's3://voice-cloning-zero-shot/063113ea-ee4e-4a25-8f79-360c29fc96c1/original/manifest.json',
  'Jorge (Narrative)':
    's3://voice-cloning-zero-shot/ec8095bd-bbab-4229-8527-0b0ead293823/original/manifest.json',
  'Renato (Conversational)':
    's3://voice-cloning-zero-shot/43c05226-b8f2-4e53-8184-e4beb7f4606a/original/manifest.json',
  'Ange (Conversational)':
    's3://voice-cloning-zero-shot/09993052-0db5-4f9d-9eb4-30da05282f44/original/manifest.json',
  'Ange (Narrative)':
    's3://voice-cloning-zero-shot/067f8a04-9138-440b-971d-5cce69f4c271/original/manifest.json',
  'Gaelle (Conversational)':
    's3://voice-cloning-zero-shot/7101ecc1-8071-47c8-a7d2-ffef2000616c/original/manifest.json',
  'Gaelle (Narrative)':
    's3://voice-cloning-zero-shot/19561064-851a-4740-95fa-34d4bf16fa4f/original/manifest.json',
  'Laurence (Conversational)':
    's3://voice-cloning-zero-shot/94453b23-b60c-4852-9eac-ae76166b1ba5/original/manifest.json',
  'Laurence (Narrative)':
    's3://voice-cloning-zero-shot/21ca9f6f-6044-489a-a901-18867690622c/original/manifest.json',
  'Anke (Conversational)':
    's3://voice-cloning-zero-shot/c1cb7f62-4a59-4593-b6c6-6b430892541d/original/manifest.json',
  'Anke (Narrative)':
    's3://voice-cloning-zero-shot/2f91566e-215a-4234-96e2-60acf07fed5e/original/manifest.json',
  'David (Conversational)':
    's3://voice-cloning-zero-shot/4c8f0ddf-5c76-4ad6-ac8b-03fc96ea5233/original/manifest.json',
  'David (Narrative)':
    's3://voice-cloning-zero-shot/84c1437e-4225-482b-bce4-d519326f9fc1/original/manifest.json',
  'Ilias (Conversational)':
    's3://voice-cloning-zero-shot/adcf0e59-1b93-47b6-b88e-13e9c35fb6ec/original/manifest.json',
  'Ilias (Narrative)':
    's3://voice-cloning-zero-shot/f78a1dc3-6533-4967-a0d2-88e13894a45a/original/manifest.json',
  'Bora (Conversational)':
    's3://voice-cloning-zero-shot/7a3da4b1-5e25-4076-a368-48a9c6d2981e/original/manifest.json',
  'Bora (Narrative)':
    's3://voice-cloning-zero-shot/f87aaa4d-6ac3-4acd-bb99-70af1ebd44b8/original/manifest.json',
  'Chrysa (Conversational)':
    's3://voice-cloning-zero-shot/c1752411-4daa-4912-b5a0-634b25a9b63d/original/manifest.json',
  'Chrysa (Narrative)':
    's3://voice-cloning-zero-shot/6d2b1907-f177-4fc7-8b63-d090531d17e3/original/manifest.json',
  'Valantis (Conversational)':
    's3://voice-cloning-zero-shot/0a314c82-0baa-4b99-a522-ea9e29e0c2f0/original/manifest.json',
  'Valantis (Narrative)':
    's3://voice-cloning-zero-shot/0bb0d688-e738-4d1e-b777-374d1bd81e9a/original/manifest.json',
  'Valantis (Podcast)':
    's3://voice-cloning-zero-shot/5e14b798-6c1f-46d7-925f-7562eff9f5f1/original/manifest.json',
  'Anuj (Conversational)':
    's3://voice-cloning-zero-shot/6f3decaf-f64f-414a-b16a-f8a1492d28a6/original/manifest.json',
  'Anuj (Narrative)':
    's3://voice-cloning-zero-shot/610e98bb-5c9c-4a98-b390-94d539a77996/original/manifest.json',
  'Maanekshi (Conversational)':
    's3://voice-cloning-zero-shot/8049484f-3055-42b8-ab13-25ccf0475710/original/manifest.json',
  'Maanekshi (Narrative)':
    's3://voice-cloning-zero-shot/bc3aac42-8e8f-43e2-8919-540f817a0ac4/original/manifest.json',
  'Neeti (Conversational)':
    's3://voice-cloning-zero-shot/6089034b-bda6-4a76-a9e1-709b3a881514/original/manifest.json',
  'Neeti (Narrative)':
    's3://voice-cloning-zero-shot/b81c4ecc-b74f-4482-bd6c-026adbb84c76/original/manifest.json',
  'Pravin (Conversational)':
    's3://voice-cloning-zero-shot/e4749094-943d-4751-82e0-c13930e0a659/original/manifest.json',
  'Pravin (Narrative)':
    's3://voice-cloning-zero-shot/13ff8c72-7e5a-471e-b3fc-0e708ea4046c/original/manifest.json',
  'Sachin (Conversational)':
    's3://voice-cloning-zero-shot/29c3fc22-d566-492c-b38a-5797862dc1ee/original/manifest.json',
  'Sachin (Narrative)':
    's3://voice-cloning-zero-shot/f0c4da39-8030-474b-ae88-e76312b98ae1/original/manifest.json',
  'Alessandro (Conversational)':
    's3://voice-cloning-zero-shot/35f48866-aae9-4bde-8264-409c4b046e74/original/manifest.json',
  'Alessandro (Narrative)':
    's3://voice-cloning-zero-shot/4bf73a41-39f0-48a7-8c34-9b6e1720ce51/original/manifest.json',
  'Fabio (Conversational)':
    's3://voice-cloning-zero-shot/bb24aff9-6b5f-406f-9ae2-4fff116fbb6a/original/manifest.json',
  'Fabio (Narrative)':
    's3://voice-cloning-zero-shot/d41f196e-9dc5-461e-aa84-9d3a60f5f484/original/manifest.json',
  'Giulia (Conversational)':
    's3://voice-cloning-zero-shot/43ae27b5-cad2-4801-95fc-f4d53456b0ec/original/manifest.json',
  'Giulia (Narrative)':
    's3://voice-cloning-zero-shot/1f8be5c0-848a-4de4-a32e-cdba0816a165/original/manifest.json',
  'Marco (Conversational)':
    's3://voice-cloning-zero-shot/7be9afeb-40e8-4902-9af5-51f81ecd601a/original/manifest.json',
  'Kiriko (Conversational)':
    's3://voice-cloning-zero-shot/f5dee056-a6fe-488f-99d7-5a7d30823c31/original/manifest.json',
  'Kiriko (Narrative)':
    's3://voice-cloning-zero-shot/63cdb0d7-cc74-4894-97b8-60337507707e/original/manifest.json',
  'Koji (Conversational)':
    's3://voice-cloning-zero-shot/cf813b9f-4da6-4586-906f-b07842a17601/original/manifest.json',
  'Koji (Narrative)':
    's3://voice-cloning-zero-shot/5ff94985-a335-4093-b3c0-0b4ffac5d5fc/original/manifest.json',
  'Jun (Conversational)':
    's3://voice-cloning-zero-shot/00325021-7969-4c8b-949f-0b6cbb043ea2/original/manifest.json',
  'Jun (Narrative)':
    's3://voice-cloning-zero-shot/a0d2104c-40aa-4d7a-8eb6-6d8c937e0d38/original/manifest.json',
  'Tsukasa (Conversational)':
    's3://voice-cloning-zero-shot/c4ee9511-d053-4720-8813-c0844402d5ce/original/manifest.json',
  'Tsukasa (Narrative)':
    's3://voice-cloning-zero-shot/22de0371-a2f5-4495-a5bd-509ae5e31c78/original/manifest.json',
  'Yumiko (Conversational)':
    's3://voice-cloning-zero-shot/3139176d-c6c1-4c74-9774-29239062ec3b/original/manifest.json',
  'Yumiko (Narrative)':
    's3://voice-cloning-zero-shot/627b1059-0ae7-4dd8-a494-d36c8f143b0a/original/manifest.json',
  'Dohee (Conversational)':
    's3://voice-cloning-zero-shot/94c9868a-da30-4263-81f7-16c7288acd4c/original/manifest.json',
  'Dohee (Narrative)':
    's3://voice-cloning-zero-shot/e8177169-235a-4559-a13b-baf324f96bbd/original/manifest.json',
  'Hun (Conversational)':
    's3://voice-cloning-zero-shot/3b32b6cd-a738-4fdc-8e29-4ef36127e6a6/original/manifest.json',
  'Hun (Narrative)':
    's3://voice-cloning-zero-shot/f6eda8eb-ebb1-459c-a6a3-846ec588961c/original/manifest.json',
  'Ignatius (Conversational)':
    's3://voice-cloning-zero-shot/b611926f-9c79-49a6-ad7b-cc810ed80186/original/manifest.json',
  'Ignatius (Narrative)':
    's3://voice-cloning-zero-shot/2ccd3db8-8544-49e6-824f-ae67c9b99a62/original/manifest.json',
  'Ignatius (Podcast)':
    's3://voice-cloning-zero-shot/0d037121-dccb-4f32-bdf4-ef9c94c8ec7f/original/manifest.json',
  'Adam (Conversational)':
    's3://voice-cloning-zero-shot/294ab1d2-fdcd-4a90-9dee-b2f76676be5f/original/manifest.json',
  'Adam (Narrative)':
    's3://voice-cloning-zero-shot/99fba53e-f238-46a7-a496-f8737197ed62/original/manifest.json',
  'Konstanty (Conversational)':
    's3://voice-cloning-zero-shot/978eb3df-ccd3-476f-b10d-a0c4129f4956/original/manifest.json',
  'Konstanty (Narrative)':
    's3://voice-cloning-zero-shot/0dba832f-6b03-4990-803f-f4da4852b3e6/original/manifest.json',
  'Konstanty (Podcast)':
    's3://voice-cloning-zero-shot/d0fe1901-545a-488f-8a86-0f0d6fc6aa5b/original/manifest.json',
  'Julia (Conversational)':
    's3://voice-cloning-zero-shot/cad4f9fb-f47d-4beb-a668-4f348410f30c/original/manifest.json',
  'Julia (Narrative)':
    's3://voice-cloning-zero-shot/e91f42c4-2f3a-4e62-bb7e-9e398e54b2b1/original/manifest.json',
  'Julia (Podcast)':
    's3://voice-cloning-zero-shot/0183c952-20d6-4efa-a68e-9a2f575e2e1e/original/manifest.json',
  'Andrei (Conversational)':
    's3://voice-cloning-zero-shot/dbdd6513-2739-420c-a390-5cc82078aa67/original/manifest.json',
  'Andrei (Narrative)':
    's3://voice-cloning-zero-shot/73083c67-097b-430c-a410-220ab0c2dea8/original/manifest.json',
  'Andrei (Podcast)':
    's3://voice-cloning-zero-shot/2a34938c-5040-479a-9aae-08e12bc99417/original/manifest.json',
  'Efim (Conversational)':
    's3://voice-cloning-zero-shot/63e1fb33-f44c-4f5d-9c74-598f04c2e6f2/original/manifest.json',
  'Efim (Narrative)':
    's3://voice-cloning-zero-shot/4adb8395-2eb3-4a8a-8a0d-0a78da2b7030/original/manifest.json',
  'Efim (Podcast)':
    's3://voice-cloning-zero-shot/32d329a9-b9d3-46b7-a62b-5a0db1c1ed7b/original/manifest.json',
  'Aleksa (Conversational)':
    's3://voice-cloning-zero-shot/3edbdafa-526e-42b9-bb74-1c66cc85edbb/original/manifest.json',
  'Aleksa (Narrative)':
    's3://voice-cloning-zero-shot/dbe83f0d-c4d5-4ab3-8a57-6ec1f3020707/original/manifest.json',
  'Aleksa (Podcast)':
    's3://voice-cloning-zero-shot/0b4628ea-f3cb-4935-9b47-93737fae6cae/original/manifest.json',
  'Dunja (Conversational)':
    's3://voice-cloning-zero-shot/66ce2702-260a-4c29-98a9-de363485cd6d/original/manifest.json',
  'Dunja (Narrative)':
    's3://voice-cloning-zero-shot/3bc7d453-dca0-48a8-b26b-47a6097a6ef1/original/manifest.json',
  'Dunja (Podcast)':
    's3://voice-cloning-zero-shot/88b7b183-e5c1-4c9a-90b4-564be824cd7b/original/manifest.json',
  'Magdalena (Conversational)':
    's3://voice-cloning-zero-shot/90bbb067-54cd-4c12-9f20-90644987cdff/original/manifest.json',
  'Magdalena (Narrative)':
    's3://voice-cloning-zero-shot/c725b3c5-1fc0-4f64-99d5-e247203dae70/original/manifest.json',
  'Magdalena (Podcast)':
    's3://voice-cloning-zero-shot/e778f3d0-e967-4470-9d49-68d63cb42762/original/manifest.json',
  'Nikola (Conversational)':
    's3://voice-cloning-zero-shot/9d1511f0-132e-45b8-bf77-4349a81c18c5/original/manifest.json',
  'Nikola (Narrative)':
    's3://voice-cloning-zero-shot/dd0fed8a-7b5f-45f4-97e7-e53107e0dfc1/original/manifest.json',
  'Petar (Conversational)':
    's3://voice-cloning-zero-shot/8aae54d3-0626-4b11-be35-3a600e7eed61/original/manifest.json',
  'Petar (Narrative)':
    's3://voice-cloning-zero-shot/f0bbd9d1-1520-42e0-8e44-e893c9613ba4/original/manifest.json',
  'Petar (Podcast)':
    's3://voice-cloning-zero-shot/1a3ee799-1d87-46ad-8b20-2a1c6d67c60d/original/manifest.json',
  'Carmen (Conversational)':
    's3://voice-cloning-zero-shot/3198f5d0-664c-4835-9728-92eb8cdd556c/original/manifest.json',
  'Patricia (Conversational)':
    's3://voice-cloning-zero-shot/e0bf73c2-2b50-455a-8524-cc29de4360d1/original/manifest.json',
  'Patricia (Narrative)':
    's3://voice-cloning-zero-shot/5694d5e5-2dfe-4440-8cc8-e2a69c3e7560/original/manifest.json',
  'Violeta (Conversational)':
    's3://voice-cloning-zero-shot/4289181f-48fc-4c52-911f-6e769086eb98/original/manifest.json',
  'Violeta (Narrative)':
    's3://voice-cloning-zero-shot/326c3793-b5b1-4ce3-a8ec-22c95d8553f0/original/manifest.json',
  'Xavi (Conversational)':
    's3://voice-cloning-zero-shot/b815208f-4677-4114-a0d4-64b71102c097/original/manifest.json',
  'Xavi (Narrative)':
    's3://voice-cloning-zero-shot/36328a44-5c42-4a35-a9a1-b45596a56c88/original/manifest.json',
  'Aiken (Conversational)':
    's3://voice-cloning-zero-shot/3a174cca-4ca2-4936-a0e7-e142e2f87317/original/manifest.json',
  'Aiken (Narrative)':
    's3://voice-cloning-zero-shot/487418ee-3316-4044-afce-d18bcd3e1451/original/manifest.json',
  'Jaro (Conversational)':
    's3://voice-cloning-zero-shot/67a8d750-e675-4ce8-856c-14a71cf15585/original/manifest.json',
  'Katbundit (Conversational)':
    's3://voice-cloning-zero-shot/f80c355d-1075-4d2b-a53d-bb26aa4d1453/original/manifest.json',
  'Katbundit (Narrative)':
    's3://voice-cloning-zero-shot/e1357526-c162-441b-afb9-285d3d21b9b4/original/manifest.json',
  'Nattchanita (Conversational)':
    's3://voice-cloning-zero-shot/ba9eb1c9-8897-4c41-9c79-f2cb428544a8/original/manifest.json',
  'Nattchanita (Narrative)':
    's3://voice-cloning-zero-shot/4353be7d-8cd3-4452-9e0b-bc4078c240d7/original/manifest.json',
  'Nattha (Conversational)':
    's3://voice-cloning-zero-shot/bb585812-1c85-4a16-90f7-09c24b6c8186/original/manifest.json',
  'Nattha (Narrative)':
    's3://voice-cloning-zero-shot/4c495e1a-1352-4187-99eb-6e5dc7d55059/original/manifest.json',
  'Nopparat (Conversational)':
    's3://voice-cloning-zero-shot/59933136-5aca-4f42-827f-d354649c62a2/original/manifest.json',
  'Nopparat (Narrative)':
    's3://voice-cloning-zero-shot/edd305a3-9cd2-4dd6-873f-9efc1f73aefc/original/manifest.json',
  'Ali (Conversational)':
    's3://voice-cloning-zero-shot/39ca9ea3-e576-43c7-b06e-9574b410e8e9/original/manifest.json',
  'Ali (Narrative)':
    's3://voice-cloning-zero-shot/832368bb-16b1-4835-888d-a4826b25ab24/original/manifest.json',
  'Ali (Podcast)':
    's3://voice-cloning-zero-shot/7b81e974-1518-4f7c-8f44-20c491ef2161/original/manifest.json',
  'Sahil (Conversational)':
    's3://voice-cloning-zero-shot/f0e1c482-bbed-4c7e-8af0-5a9859b28f8c/original/manifest.json',
  'Sahil (Narrative)':
    's3://voice-cloning-zero-shot/082b0195-7e30-4554-80a6-cf4a67996e8b/original/manifest.json',
  'Mary (Conversational)':
    's3://voice-cloning-zero-shot/20008550-9a38-4366-93f0-76381c221fb1/original/manifest.json',
  'Mary (Narrative)':
    's3://voice-cloning-zero-shot/08dbdaf6-8d3a-446d-8fc4-3ad69e9ee5bc/original/manifest.json',
  'Mary (Podcast)':
    's3://voice-cloning-zero-shot/4b86ea46-2095-43a6-889c-d26146cd33d2/original/manifest.json',
};

type PlayModel = 'Play3.0-mini' | 'PlayDialog';
type PlayVoice = keyof typeof voices | `s3://${string}.json`;

type PlayTTSProps = {
  model: PlayModel;
  text: string;
  voice: PlayVoice;
  language?:
    | 'afrikaans'
    | 'albanian'
    | 'amharic'
    | 'arabic'
    | 'bengali'
    | 'bulgarian'
    | 'catalan'
    | 'croatian'
    | 'czech'
    | 'danish'
    | 'dutch'
    | 'english'
    | 'french'
    | 'galician'
    | 'german'
    | 'greek'
    | 'hebrew'
    | 'hindi'
    | 'hungarian'
    | 'indonesian'
    | 'italian'
    | 'japanese'
    | 'korean'
    | 'malay'
    | 'mandarin'
    | 'polish'
    | 'portuguese'
    | 'russian'
    | 'serbian'
    | 'spanish'
    | 'swedish'
    | 'tagalog'
    | 'thai'
    | 'turkish'
    | 'ukrainian'
    | 'urdu'
    | 'xhosa';
  outputFormat?: 'mp3' | 'mulaw' | 'raw' | 'wav' | 'ogg' | 'flac';
  prompt?: string;
  prompt2?: string;
  sampleRate?: number;
  seed?: number;
  speed?: number;
  temperature?: number;
  turnPrefix?: string;
  turnPrefix2?: string;
  voice2?: string;
  voiceConditioningSeconds?: number;
  voiceConditioningSeconds2?: number;
  webHookUrl?: string;
};

type PlayTTSResponse = {
  id: string;
  createdAt: string;
  input: PlayTTSProps;
  completedAt: string | null;
  output:
    | {
        status: 'COMPLETED';
        contentType: string;
        fileSize: number;
        duration: number;
        url: string;
      }
    | {
        status: 'IN_PROGRESS';
      }
    | {
        status: 'FAILED';
      };
};

export class Play {
  private apiKey: string;
  private userId: string;

  constructor(options: {
    apiKey?: string;
    userId?: string;
  }) {
    this.apiKey = options.apiKey || process.env.PLAYAI_API_KEY || '';
    this.userId = options.userId || process.env.PLAYAI_USER_ID || '';

    if (!this.apiKey) {
      throw new Error('PLAYAI_API_KEY is not set');
    }

    if (!this.userId) {
      throw new Error('PLAYAI_USER_ID is not set');
    }
  }

  /**
   * Creates a text-to-speech synthesis function using PlayAI
   * @param {PlayModel} model - The model to use for synthesis. Defaults to 'Play3.0-mini'
   * @param {PlayVoice} voice - The voice to use for synthesis. Defaults to 'Angelo'
   * @param {Omit<PlayTTSProps, 'model' | 'voice' | 'text'>} properties - Additional properties for the synthesis request
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: PlayModel = 'Play3.0-mini',
    voice: PlayVoice = 'Angelo',
    options?: Omit<PlayTTSProps, 'model' | 'voice' | 'text'>
  ) {
    let voiceId = voice;

    if (!voiceId.startsWith('s3://')) {
      voiceId = voices[voiceId as keyof typeof voices] as PlayVoice;
    }

    return async (prompt: string) => {
      const url = new URL('/api/v1/tts', 'https://api.play.ai');
      const body: PlayTTSProps = {
        model,
        voice: voiceId,
        text: prompt,
        ...options,
      };

      const response = await ky
        .post(url, {
          headers: {
            AUTHORIZATION: this.apiKey,
            'X-USER-ID': this.userId,
          },
          json: body,
        })
        .json<PlayTTSResponse>();

      if (response.output.status === 'FAILED') {
        throw new Error('Failed to synthesize speech');
      }

      if (response.output.status === 'COMPLETED') {
        const blob = await ky.get(response.output.url).blob();
        const file = new File([blob], 'speech.mp3', {
          type: 'audio/mpeg',
        });

        return file;
      }

      while (true) {
        const checkUrl = new URL(
          `/api/v1/tts/${response.id}`,
          'https://api.play.ai'
        );
        const checkResponse = await ky
          .get(checkUrl, {
            headers: {
              AUTHORIZATION: this.apiKey,
              'X-USER-ID': this.userId,
            },
          })
          .json<PlayTTSResponse>();

        if (checkResponse.output.status === 'FAILED') {
          throw new Error('Failed to synthesize speech');
        }

        if (checkResponse.output.status === 'COMPLETED') {
          const blob = await ky.get(checkResponse.output.url).blob();
          const file = new File([blob], 'speech.mp3', {
            type: 'audio/mpeg',
          });

          return file;
        }

        // If queued or processing, wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  }
}
