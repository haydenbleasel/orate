import { CartesiaClient } from '@cartesia/cartesia-js';
import type {
  TtsRequest,
  VoiceChangerBytesRequest,
} from '@cartesia/cartesia-js/api';
import type { ChangeOptions, SpeakOptions } from '.';

type CartesiaModel =
  | 'sonic-2'
  | 'sonic-2-2025-03-07'
  | 'sonic-turbo'
  | 'sonic-turbo-2025-03-07'
  | 'sonic'
  | 'sonic-2024-12-12'
  | 'sonic-2024-10-19';

const CartesiaVoices = {
  Silas: '7e19344f-9f17-47d7-a13a-4366ad06ebf3',
  Orion: '701a96e1-7fdd-4a6c-a81e-a4a450403599',
  Grant: '63406bbd-ce1b-4fff-8beb-86d3da9891b9',
  Leyla: 'fa7bfcdc-603c-4bf1-a600-a371400d2f8c',
  Lars: '0caedb75-417f-4e36-9b64-c21354cb94c8',
  Amit: '9b953e7b-86a8-42f0-b625-1434fb15392b',
  Lucas: 'af482421-80f4-4379-b00c-a118def29cde',
  Sanne: '0eb213fe-4658-45bc-9442-33a48b24b133',
  Takeshi: '06950fa3-534d-46b3-93bb-f852770ea0b5',
  Ishan: 'fd2ada67-c2d9-4afe-b474-6386b87d8fc3',
  Pavan: 'e61a659d-56d5-4023-a499-1e1bccbc40e9',
  'Dutch Confident Man': '9e8db62d-056f-47f3-b3b6-1b05767f9176',
  'Hindi Calm Man': 'ac7ee4fa-25db-420d-bfff-f590d740aeb2',
  Zofia: 'dcf62f33-7cff-4f20-85b2-2efaa68cbc32',
  Freja: '6c6b05bf-ae5f-4013-82ab-7348e99ffdb2',
  Carlos: '143de963-600b-4ad4-9b62-e458929ccb36',
  Tatiana: '064b17af-d36b-4bfb-b003-be07dba1b649',
  Jakub: '2a3503b2-b6b6-4534-a224-e8c0679cec4a',
  Kenji: '6b92f628-be90-497c-8f4c-3b035002df71',
  Marco: '79693aee-1207-4771-a01e-20c393c89e6f',
  Devansh: '1259b7e3-cb8a-43df-9446-30971a46b8b0',
  Aditi: '1998363b-e108-4736-bc5b-1449fa2b096a',
  'Sarah 2025-02-09': 'ac1a7632-4bd3-4aa4-aea2-5178577440fa',
  Lukas: 'e00dd3df-19e7-4cd4-827a-7ff6687b6954',
  'Hindi Reporter Man': 'bdab08ad-4137-4548-b9db-6142854c7525',
  'Little Narrator Girl': '56b87df1-594d-4135-992c-1112bb504c59',
  'Little Gaming Girl': 'cccc21e8-5bcf-4ff0-bc7f-be4e40afc544',
  'Young Female Character': '6a9264bd-dd51-4a91-99fa-d81d93df833f',
  'Ren the Fury': '9e7ef2cf-b69c-46ac-9e35-bbfd73ba82af',
  'Lily Whisper': 'c7eafe22-8b71-40cd-850b-c5a3bbd8f8d2',
  'Positive Shy Man': 'c2488032-7cba-449c-9036-9e11b69286a1',
  Yippy: '8f490c09-3b8f-4108-ac0c-51288154fa05',
  'Spanish-speaking Reporter Man': '2695b6b5-5543-4be1-96d9-3967fb5e7fec',
  Sportsman: 'ed81fd13-2016-4a49-8fe3-c0d2761695fc',
  'Stern French Man': '0418348a-0ca2-4e90-9986-800fb8b3bbc0',
  'Storyteller Lady': '996a8b96-4804-46f0-8e05-3fd4ef1a87cd',
  'Griffin Excited': '34d923aa-c3b5-4f21-aac7-2c1f12730d4b',
  'Polish Narrator Man': '4ef93bb3-682a-46e6-b881-8e157b6b4388',
  Klaus: 'b52ef98f-d0db-4fda-ab7e-baf71a062fe7',
  'Italian Calm Man': '408daed0-c597-4c27-aae8-fa0497d644bf',
  'Customer Service Man': '2a4d065a-ac91-4203-a015-eb3fc3ee3365',
  'American Narrator Lady': 'a8136a0c-9642-497a-882d-8d591bdcb2fa',
  'Mexican Man': '15d0c2e2-8d29-44c3-be23-d585d5f154a1',
  Neil: 'a0cc0d65-5317-4652-b166-d9d34a244c6f',
  'Indian Conversational Woman': '9cebb910-d4b7-4a4a-85a4-12c79137724c',
  Shreya: 'e604287d-0c9b-4e0e-82a7-71d21af2cade',
  Parvati: 'bec003e2-3cb3-429c-8468-206a393c67ad',
  Yogaman: 'f114a467-c40a-4db8-964d-aaba89cd08fa',
  Wizardman: '87748186-23bb-4158-a1eb-332911b0b708',
  'Sarah Curious': '794f9389-aac1-45b6-b726-9d9369183238',
  'Helpful Woman': '156fb8d2-335b-4950-9cb3-a2d33befec77',
  'Southern Woman': 'f9836c6e-a0bd-460e-9d3c-f7299fa60f94',
  Sarah: '694f9389-aac1-45b6-b726-9d9369183238',
  Greta: 'f34eb6ad-4333-47a3-9e22-54a078988df2',
  'Friendly Sidekick': 'e00d0e4c-a5c8-443f-a8a3-473eb9a62355',
  'Madame Mischief': 'e13cae5c-ec59-4f71-b0a6-266df3c9bb8e',
  'Italian Narrator Woman': '0e21713a-5e9a-428a-bed4-90d410b87f13',
  'Russian Narrator Man': '2b3bb17d-26b9-421f-b8ca-1dd92332279f',
  'Help Desk Woman': 'af346552-54bf-4c2b-a4d4-9d2820f51b6c',
  'Italian Narrator Man': '029c3c7a-b6d9-44f0-814b-200d849830ff',
  'German Conversation Man': '384b625b-da5d-49e8-a76d-a2855d4f31eb',
  'French Narrator Lady': '8832a0b5-47b2-4751-bb22-6a8e2149303d',
  'Spanish Narrator Man': '34dbb662-8e98-413c-a1ef-1a3407675fe7',
  'Helpful French Lady': '65b25c5d-ff07-4687-a04c-da2f43ef6fa9',
  'Friendly French Man': 'ab7c61f5-3daa-47dd-a23b-4ac0aac5f5c3',
  'Heroic Man': 'ec58877e-44ae-4581-9078-a04225d42bd4',
  'Commanding Japanese Man': '446f922f-c43a-4aad-9a8b-ad2af568e882',
  Jordan: '87bc56aa-ab01-4baa-9071-77d497064686',
  'Young Shy Japanese Woman': '0cd0cde2-3b93-42b5-bcb9-f214a591aa29',
  Yuki: '59d4fd2f-f5eb-4410-8105-58db7661144f',
  'Korean Narrator Woman': '663afeec-d082-4ab5-827e-2e41bf73a25b',
  'Turkish Narrator Man': '5a31e4fb-f823-4359-aa91-82c0ae9a991c',
  'Australian Customer Support Man': '41f3c367-e0a8-4a85-89e0-c27bae9c9b6d',
  'American Voiceover Man': '7fe6faca-172f-4fd9-a193-25642b8fdb07',
  'American Ad Read Man': '64462aed-aafc-45d4-84cd-ecb4b3763a0a',
  'Help Desk Man': '39b376fc-488e-4d0c-8b37-e00b72059fdd',
  'The Merchant': '50d6beb4-80ea-4802-8387-6c948fe84208',
  'German Woman': 'b9de4a89-2257-424b-94c2-db18ba68c81a',
  'Mexican Woman': '5c5ad5e7-1020-476b-8b91-fdcbe9cc313c',
  'Japanese Children Book': '44863732-e415-4084-8ba1-deabe34ce3d2',
  'Chinese Commercial Man': 'eda5bbff-1ff1-4886-8ef1-4e69a77640a0',
  'Old Timey Radio Man': '236bb1fb-dc41-4a2b-84d6-d22d2a2aaae1',
  'Robotic Male': '185c2177-de10-4848-9c0a-ae6315ac1493',
  'The Oracle': 'd7862948-75c3-4c7c-ae28-2959fe166f49',
  Annabel: 'bf5d344d-62b4-4fb8-9073-312bb29c7e4f',
  'Australian Promoter Man': 'a3afd376-04f9-48e2-a966-132cdfdbc093',
  'Japanese Male Conversational': 'e8a863c6-22c7-4671-86ca-91cacffc038d',
  'Castilian Spanish Presenter Woman': 'd4db5fb9-f44b-4bd1-85fa-192e0f0d75f9',
  'Castilian Spanish Presenter Man': 'b5aa8098-49ef-475d-89b0-c9262ecf33fd',
  'German Conversational Woman': '3f4ade23-6eb4-4279-ab05-6a144947c4d5',
  'Spanish Narrator Lady': '2deb3edf-b9d8-4d06-8db9-5742fb8a3cb2',
  Lena: '4ab1ff51-476d-42bb-8019-4d315f7c0c05',
  'Commercial Lady': 'c2ac25f9-ecc4-4f56-9095-651354df60c0',
  Mia: '1d3ba41a-96e6-44ad-aabb-9817c56caa68',
  Grace: 'a38e4e85-e815-43ab-acf1-907c4688dd6c',
  Pooja: '3cbf8fed-74d5-4690-b715-711fcf8d825f',
  'Peninsular Spanish Narrator Lady': 'a956b555-5c82-404f-9580-243b5178978d',
  'Hindi Narrator Man': '7f423809-0011-4658-ba48-a411f5e516ba',
  Priya: 'f6141af3-5f94-418c-80ed-a45d450e7e2e',
  Kiara: 'f8f5f1b2-f02d-4d8e-a40d-fd850a487b3d',
  Luca: 'e5923af7-a329-4e9b-b95a-5ace4a083535',
  Anu: '87177869-f798-48ae-870f-e07d0c960a1e',
  Janvi: '7ea5e9c2-b719-4dc3-b870-5ba5f14d31d8',
  Elena: 'cefcb124-080b-4655-b31f-932f3ee743de',
  'Chinese Lecturer Man': 'c59c247b-6aa9-4ab6-91f9-9eabea7dc69e',
  'Turkish Narrator Lady': 'bb2347fe-69e9-4810-873f-ffd759fe8420',
  'Australian Salesman': 'da4a4eff-3b7e-4846-8f70-f075ff61222c',
  'Australian Support Agent': '34b3e510-dd50-4a8d-86d7-478e7ee5a9e8',
  Brighton: '7447a397-30c1-4681-b687-0ed1b7abf0fb',
  Arbuckle: '572339a6-ba03-4d07-ac2a-0b86308d1ea2',
  Clarion: '8d110413-2f14-44a2-8203-2104db4340e9',
  Benedict: '7cf0e2b1-8daf-4fe4-89ad-f6039398f359',
  Gregor: 'e2569545-f8d1-4c24-bfaf-73f951052337',
  Harry: '3dcaa773-fb1a-47f7-82a4-1bf756c4e1fb',
  Lenny: '4629672e-661d-4f59-93fc-8db4476b585f',
  Dorian: '586b6832-1ca1-43ad-b974-527dc13c2532',
  'Nonfiction Man': '79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e',
  'Japanese Narration Man': '97e7d7a9-dfaa-4758-a936-f5f844ac34cc',
  Sabine: '11c61307-4f9e-4db8-ac3b-bfa5f2a731ce',
  'Calm Lady': '00a77add-48d5-4ef6-8157-71e5437b282d',
  Alina: '38aabb6a-f52b-4fb0-a3d1-988518f4dc06',
  'Chinese Reading Woman': 'f9a4b3a6-b44b-469f-90e3-c8e19bd30e99',
  'Conversational Brazilian Woman': '1cf751f6-8749-43ab-98bd-230dd633abdb',
  'Casual Brazilian Man': 'a37639f0-2f0a-4de4-9942-875a187af878',
  'Japanese Woman Conversational': '2b568345-1d48-4047-b25f-7baccf842eb0',
  Ethan: '00967b2f-88a6-4a31-8153-110a92134b9f',
  'Reflective Woman': 'a3520a8f-226a-428d-9fcd-b0a4711a6829',
  'Hinglish Speaking Woman': '95d51f79-c397-46f9-b49a-23763d3eaa2d',
  Taylan: 'c1cfee3d-532d-47f8-8dd2-8e5b2b66bf1d',
  Tiago: '6a360542-a117-4ed5-9e09-e8bf9b05eabb',
  'Intense Japanese Man': 'a759ecc5-ac21-487e-88c7-288bdfe76999',
  'Russian Storyteller Man': 'da05e96d-ca10-4220-9042-d8acef654fa9',
  Apoorva: 'faf0731e-dfb9-4cfc-8119-259a79b27e12',
  Ananya: '28ca2041-5dda-42df-8123-f58ea9c3da00',
  Charvi: 'dc40fa13-d344-4c77-b579-1f0aec140e05',
  Mihir: 'be79f378-47fe-4f9c-b92b-f02cefa62ccf',
  'Russian Narrator Woman': '642014de-c0e3-4133-adc0-36b5309c23e6',
  "1920's Radioman": '41534e16-2966-4c6b-9670-111411def906',
  'Chinese Call Center Man': '3a63e2d1-1c1e-425d-8e79-5100bc910e90',
  Brooke: '6f84f4b8-58a2-430c-8c79-688dad597532',
  Griffin: 'c99d36f3-5ffd-4253-803a-535c1bc9c306',
  Mateo: '79743797-2087-422f-8dc7-86f9efca85f1',
  Zia: '32b3f3c5-7171-46aa-abe7-b598964aa793',
  'Midwestern Woman': '11af83e2-23eb-452f-956e-7fee218ccb5c',
  'Polish Young Man': '82a7fc13-2927-4e42-9b8a-bb1f9e506521',
  'Alabama Man': '40104aff-a015-4da1-9912-af950fbec99e',
  Anna: '91b4cf29-5166-44eb-8054-30d40ecc8081',
  'British Reading Lady': '71a7ad14-091c-4e8e-a314-022ece01c121',
  'Midwestern Man': '565510e8-6b45-45de-8758-13588fbaec73',
  'Indian Man': '638efaaa-4d0c-442e-b701-3fae16aad012',
  'Sweet Lady': 'e3827ec5-697a-4b7c-9704-1a23041bbc51',
  'Middle Eastern Woman': 'daf747c6-6bc2-4083-bd59-aa94dce23f5d',
  'Pilot over Intercom': '36b42fcb-60c5-4bec-b077-cb1a00a92ec6',
  'Indian Lady': '3b554273-4299-48b9-9aaf-eefd438e3941',
  'Southern Man': '98a34ef2-2140-4c28-9c71-663dc4dd7022',
  'Confident British Man': '63ff761f-c1e8-414b-b969-d1833d1c870c',
  'Professional Woman': '248be419-c632-4f23-adf1-5324ed7dbf1d',
  Newslady: 'bf991597-6c13-47e4-8411-91ec2de5c466',
  Movieman: 'c45bc5ec-dc68-4feb-8829-6e6b2748095d',
  'Barbershop Man': 'a0e99841-438c-4a64-b679-ae501e7d6091',
  'British Lady': '79a125e8-cd45-4c13-8a67-188112f4dd22',
  'Chinese Commercial Woman': '0b904166-a29f-4d2e-bb20-41ca302f98e9',
  'Brazilian Young Man': '5063f45b-d9e0-4095-b056-8f3ee055d411',
  'Pleasant Brazilian Lady': '700d1ee3-a641-4018-ba6e-899dcadc9e2b',
  'Korean Support Woman': '304fdbd8-65e6-40d6-ab78-f9d18b9efdf9',
  'Korean Narrator Man': '57dba6ff-fe3b-479d-836e-06f5a61cb5de',
  Nikolai: 'f07163ac-559f-43b1-97cc-c6c6504bbb48',
  Sophie: 'bf0a246a-8642-498a-9950-80c35e9276b5',
  Francesca: 'd609f27f-f1a4-410f-85bb-10037b4fba99',
  Sebastian: 'b7187e84-fe22-4344-ba4a-bc013fcb533e',
  Clara: 'd4b44b9a-82bc-4b65-b456-763fce4c52f9',
  Mehul: 'd088cdf6-0ef0-4656-aea8-eb9b004e82eb',
  Child: '2ee87190-8f84-4925-97da-e52547f9462c',
  'Meditation Lady': 'cd17ff2d-5ea4-4695-be8f-42193949b946',
  Maria: '5345cf08-6f37-424d-a5d9-8ae1101b9377',
  'Wise Man': 'b043dea0-a007-4bbe-a708-769dc0d0c569',
  'Friendly Reading Man': '69267136-1bdc-412f-ad78-0caad210fb40',
  'Indian Customer Support Lady': 'ff1bb1a9-c582-4570-9670-5f46169d0fc8',
  'Anime Girl': '1001d611-b1a8-46bd-a5ca-551b23505334',
  'Spanish Storyteller Man': '846fa30b-6e1a-49b9-b7df-6be47092a09a',
  'Spanish Reporter Woman': 'db832ebd-3cb6-42e7-9d47-912b425adbaa',
  'Calm French Woman': 'a8a1eb38-5f15-4c1d-8722-7ac0f329727d',
  'California Girl': 'b7d50908-b17c-442d-ad8d-810c63997ed9',
  'Korean Calm Woman': '29e5f8b4-b953-4160-848f-40fae182235b',
  'Polish Confident Man': '3d335974-4c4a-400a-84dc-ebf4b73aada6',
  'Turkish Calm Man': '39f753ef-b0eb-41cd-aa53-2f3c284f948f',
  'Polish Narrator Woman': '575a5d29-1fdc-4d4e-9afa-5a9a71759864',
  'Wise Lady': 'c8605446-247c-4d39-acd4-8f4c28aa363c',
  'Customer Support Man': 'a167e0f3-df7e-4d52-a9c3-f949145efdab',
  Newsman: 'd46abd1d-2d02-43e8-819f-51fb652c1c61',
  'Classy British Man': '95856005-0332-41b0-935f-352e296aa0df',
  'Pleasant Man': '729651dc-c6c3-4ee5-97fa-350da1f88600',
  'Swedish Calm Lady': 'f852eb8d-a177-48cd-bf63-7e4dcab61a36',
  'Russian Calm Woman': '779673f3-895f-4935-b6b5-b031dc78b319',
  'Doctor Mischief': 'fb26447f-308b-471e-8b00-8e9f04284eb5',
  'New York Man': '34575e71-908f-4ab6-ab54-b08c95d6597d',
  'New York Woman': '34bde396-9fde-4ebf-ad03-e3a1d1155205',
  'Reading Lady': '15a9cd88-84b0-4a8b-95f2-5d583b54c72e',
  'German Storyteller Man': 'db229dfe-f5de-4be4-91fd-7b077c158578',
  'French Conversational Lady': 'a249eaff-1e96-4d2c-b23b-12efa4f66f41',
  'French Narrator Man': '5c3c89e5-535f-43ef-b14d-f8ffe148c1f0',
  'Friendly Brazilian Man': '6a16c1f4-462b-44de-998d-ccdaa4125a0a',
  'Polite Man': 'ee7ea9f8-c0c1-498c-9279-764d6b56d189',
  'Australian Narrator Lady': '8985388c-1332-4ce7-8d55-789628aa3df4',
  'Dutch Man': '4aa74047-d005-4463-ba2e-a0d9b261fb87',
  'Swedish Narrator Man': '38a146c3-69d7-40ad-aada-76d5a2621758',
  'Friendly Australian Man': '421b3369-f63f-4b03-8980-37a44df1d4e8',
  John: 'f785af04-229c-4a7c-b71b-f3194c7f08bb',
  'Hindi Narrator Woman': 'c1abd502-9231-4558-a054-10ac950c356d',
  'Announcer Man': '5619d38c-cf51-4d8e-9575-48f61a280413',
  'Chinese Female Conversational': 'e90c6678-f0d3-4767-9883-5d0ecf5894a8',
  'Chinese Woman Narrator': 'd4d4b115-57a0-48ea-9a1a-9898966c2966',
  'Reading Man': 'f146dcec-e481-45be-8ad2-96e1e40e7f32',
  Salesman: '820a3788-2b37-4d21-847a-b65d8a68c99a',
  'Australian Woman': '043cfc81-d69f-4bee-ae1e-7862cb358650',
  Princess: '8f091740-3df1-4795-8bd9-dc62d88e5131',
  'British Customer Support Lady': 'a01c369f-6d2d-4185-bc20-b32c225eab70',
  Corinne: '0c8ed86e-6c64-40f0-b252-b773911de6bb',
  Brenda: '607167f6-9bf2-473c-accc-ac7b3b66b30b',
  Stacy: '6d287143-8db3-434a-959c-df147192da27',
  'British Narration Lady': '4d2fd738-3b3d-4368-957a-bb4805275bd9',
  Claire: '8683bf5e-2406-4541-90b1-39d3a53f641e',
  'Dutch Narrator Lady': 'a998a552-22ac-4457-aada-b192ed6b2eaf',
  'Friendly German Man': 'fb9fcab6-aba5-49ec-8d7e-3f1100296dde',
  'German Reporter Man': '3f6e78a8-5283-42aa-b5e7-af82e8bb310c',
  'German Reporter Woman': '119e03e4-0705-43c9-b3ac-a658ce2b6639',
  Overlord: '224126de-034c-429b-9fde-71031fba9a59',
  Jacqueline: '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc',
  Cathy: '031851ba-cc34-422d-bfdb-cdbb7f4651ee',
  'Wise Guide Man': '42b39f37-515f-4eee-8546-73e841679c1d',
  'Kentucky Man': '726d5ae5-055f-4c3d-8355-d9677de68937',
  'Customer Support Lady': '829ccd10-f8b3-43cd-b8a0-4aeaa81f3b30',
  'Australian Man': '13524ffb-a918-499a-ae97-c98c7c4408c4',
  'Kentucky Woman': '4f8651b0-bbbd-46ac-8b37-5168c5923303',
  'Laidback Woman': '21b81c14-f85b-436d-aff5-43f2e788ecf8',
  'Female Nurse': '5c42302c-194b-4d0c-ba1a-8cb485c84ab9',
  'Commercial Man': '7360f116-6306-4e9a-b487-1235f35a0f21',
  'Teacher Lady': '573e3144-a684-4e72-ac2b-9b2063a50b53',
  'Tutorial Man': 'bd9120b6-7761-47a6-a446-77ca49132781',
  'ASMR Lady': '03496517-369a-4db1-8236-3d3ae459ddf7',
  Haruko: '162fb3ca-c08a-4012-8389-8c4aa2ef9cb9',
  'Spanish Narrator Woman': '846d6cb0-2301-48b6-9683-48f5618ea2f6',
  Nathan: '97f4b8fb-f2fe-444b-bb9a-c109783a857a',
  Taylor: 'abad7f2e-7eb3-4edb-b08e-d538401dfbad',
  Gabriela: '01d23d18-2956-44b0-8888-e89d234b17b4',
} as const;

export class Cartesia {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.CARTESIA_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('CARTESIA_API_KEY is not set');
    }
  }

  private createProvider() {
    return new CartesiaClient({ apiKey: this.apiKey });
  }

  /**
   * Creates a text-to-speech synthesis function using Cartesia
   * @param {CartesiaModel} model - The model ID to use for synthesis. Defaults to 'sonic-2'
   * @param {keyof typeof CartesiaVoices | (string & {})} voice - The voice ID to use for synthesis. Defaults to 'Griffin'
   * @param {Omit<TtsRequest, 'text' | 'modelId' | 'voice'>} options - Additional options for the synthesis
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(
    model: CartesiaModel = 'sonic-2',
    voice: keyof typeof CartesiaVoices | (string & {}) = 'Griffin',
    options?: Omit<TtsRequest, 'text' | 'modelId' | 'voice'>
  ) {
    const provider = this.createProvider();

    let voiceId = voice;

    if (voice in CartesiaVoices) {
      voiceId = CartesiaVoices[voice as keyof typeof CartesiaVoices];
    }

    const generate: SpeakOptions['model']['generate'] = async (
      prompt: string
    ) => {
      const response = await provider.tts.bytes({
        modelId: model,
        voice: {
          mode: 'id',
          id: voiceId,
        },
        transcript: prompt,
        outputFormat: {
          container: 'wav',
          encoding: 'pcm_s16le',
          sampleRate: 44100,
        },
        ...options,
      });

      const file = new File([response], 'speech.wav', {
        type: 'audio/wav',
      });

      return file;
    };

    const stream: SpeakOptions['model']['stream'] = async (prompt: string) => {
      const response = await provider.tts.sse({
        modelId: model,
        voice: {
          mode: 'id',
          id: voiceId,
        },
        transcript: prompt,
        outputFormat: {
          // Raw is the only format that supports streaming
          container: 'raw',

          // pcm_f32le is a 32-bit, little endian audio format designed for audio processing
          encoding: 'pcm_f32le',

          // 44100 Hz is the standard sample rate for audio
          sampleRate: 44100,
        },
        ...options,
      });

      const controller = new ReadableStream({
        async start(controller) {
          for await (const item of response) {
            controller.enqueue(item);
          }

          controller.close();
        },
      });

      return controller;
    };

    return { generate, stream };
  }

  /**
   * Creates a speech-to-speech conversion function using Cartesia
   * @param {keyof typeof CartesiaVoices | (string & {})} voice - The voice ID to use for synthesis. Defaults to 'Griffin'
   * @param {Omit<VoiceChangerBytesRequest, 'audio' | 'voiceId'>} options - Additional options for the conversion
   * @returns {Function} Async function that takes audio and returns converted speech
   */
  sts(
    voice: keyof typeof CartesiaVoices | (string & {}) = 'Griffin',
    options?: Omit<VoiceChangerBytesRequest, 'audio' | 'voiceId'>
  ) {
    const provider = this.createProvider();
    let voiceId = voice;

    if (voice in CartesiaVoices) {
      voiceId = CartesiaVoices[voice as keyof typeof CartesiaVoices];
    }

    const generate: ChangeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const response = await provider.voiceChanger.bytes(audio, {
        voiceId,
        outputFormatContainer: 'wav',
        outputFormatEncoding: 'pcm_s16le',
        outputFormatSampleRate: 44100,
        ...options,
      });

      const file = new File([response], 'converted-speech.wav', {
        type: 'audio/wav',
      });

      return file;
    };

    const stream: ChangeOptions['model']['stream'] = async (audio: File) => {
      const response = await provider.voiceChanger.sse(audio, {
        voiceId,

        // Raw is the only format that supports streaming
        outputFormatContainer: 'raw',

        // pcm_f32le is a 32-bit, little endian audio format designed for audio processing
        outputFormatEncoding: 'pcm_f32le',

        // 44100 Hz is the standard sample rate for audio
        outputFormatSampleRate: 44100,
        ...options,
      });

      const controller = new ReadableStream({
        async start(controller) {
          for await (const item of response) {
            controller.enqueue(item);
          }

          controller.close();
        },
      });

      return controller;
    };

    return { generate, stream };
  }
}
