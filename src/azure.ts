import stream from 'node:stream';
import ffmpeg from 'fluent-ffmpeg';
import AzureSDK from 'microsoft-cognitiveservices-speech-sdk';
import type { SpeakOptions, TranscribeOptions } from '.';

type AzureVoice =
  | 'af-ZA-AdriNeural'
  | 'af-ZA-WillemNeural'
  | 'am-ET-MekdesNeural'
  | 'am-ET-AmehaNeural'
  | 'ar-AE-FatimaNeural'
  | 'ar-AE-HamdanNeural'
  | 'ar-BH-LailaNeural'
  | 'ar-BH-AliNeural'
  | 'ar-DZ-AminaNeural'
  | 'ar-DZ-IsmaelNeural'
  | 'ar-EG-SalmaNeural'
  | 'ar-EG-ShakirNeural'
  | 'ar-IQ-RanaNeural'
  | 'ar-IQ-BasselNeural'
  | 'ar-JO-SanaNeural'
  | 'ar-JO-TaimNeural'
  | 'ar-KW-NouraNeural'
  | 'ar-KW-FahedNeural'
  | 'ar-LB-LaylaNeural'
  | 'ar-LB-RamiNeural'
  | 'ar-LY-ImanNeural'
  | 'ar-LY-OmarNeural'
  | 'ar-MA-MounaNeural'
  | 'ar-MA-JamalNeural'
  | 'ar-OM-AyshaNeural'
  | 'ar-OM-AbdullahNeural'
  | 'ar-QA-AmalNeural'
  | 'ar-QA-MoazNeural'
  | 'ar-SA-ZariyahNeural'
  | 'ar-SA-HamedNeural'
  | 'ar-SY-AmanyNeural'
  | 'ar-SY-LaithNeural'
  | 'ar-TN-ReemNeural'
  | 'ar-TN-HediNeural'
  | 'ar-YE-MaryamNeural'
  | 'ar-YE-SalehNeural'
  | 'as-IN-YashicaNeural'
  | 'as-IN-PriyomNeural'
  | 'az-AZ-BanuNeural'
  | 'az-AZ-BabekNeural'
  | 'bg-BG-KalinaNeural'
  | 'bg-BG-BorislavNeural'
  | 'bn-BD-NabanitaNeural'
  | 'bn-BD-PradeepNeural'
  | 'bn-IN-TanishaaNeural'
  | 'bn-IN-BashkarNeural'
  | 'bs-BA-VesnaNeural'
  | 'bs-BA-GoranNeural'
  | 'ca-ES-JoanaNeural'
  | 'ca-ES-EnricNeural'
  | 'ca-ES-AlbaNeural'
  | 'cs-CZ-VlastaNeural'
  | 'cs-CZ-AntoninNeural'
  | 'cy-GB-NiaNeural'
  | 'cy-GB-AledNeural'
  | 'da-DK-ChristelNeural'
  | 'da-DK-JeppeNeural'
  | 'de-AT-IngridNeural'
  | 'de-AT-JonasNeural'
  | 'de-CH-LeniNeural'
  | 'de-CH-JanNeural'
  | 'de-DE-KatjaNeural'
  | 'de-DE-ConradNeural'
  | 'de-DE-SeraphinaMultilingualNeural'
  | 'de-DE-FlorianMultilingualNeural'
  | 'de-DE-AmalaNeural'
  | 'de-DE-BerndNeural'
  | 'de-DE-ChristophNeural'
  | 'de-DE-ElkeNeural'
  | 'de-DE-GiselaNeural'
  | 'de-DE-KasperNeural'
  | 'de-DE-KillianNeural'
  | 'de-DE-KlarissaNeural'
  | 'de-DE-KlausNeural'
  | 'de-DE-LouisaNeural'
  | 'de-DE-MajaNeural'
  | 'de-DE-RalfNeural'
  | 'de-DE-TanjaNeural'
  | 'de-DE-Seraphina:DragonHDLatestNeural'
  | 'el-GR-AthinaNeural'
  | 'el-GR-NestorasNeural'
  | 'en-AU-NatashaNeural'
  | 'en-AU-WilliamNeural'
  | 'en-AU-AnnetteNeural'
  | 'en-AU-CarlyNeural'
  | 'en-AU-DarrenNeural'
  | 'en-AU-DuncanNeural'
  | 'en-AU-ElsieNeural'
  | 'en-AU-FreyaNeural'
  | 'en-AU-JoanneNeural'
  | 'en-AU-KenNeural'
  | 'en-AU-KimNeural'
  | 'en-AU-NeilNeural'
  | 'en-AU-TimNeural'
  | 'en-AU-TinaNeural'
  | 'en-CA-ClaraNeural'
  | 'en-CA-LiamNeural'
  | 'en-GB-SoniaNeural'
  | 'en-GB-RyanNeural'
  | 'en-GB-LibbyNeural'
  | 'en-GB-AdaMultilingualNeural'
  | 'en-GB-OllieMultilingualNeural'
  | 'en-GB-AbbiNeural'
  | 'en-GB-AlfieNeural'
  | 'en-GB-BellaNeural'
  | 'en-GB-ElliotNeural'
  | 'en-GB-EthanNeural'
  | 'en-GB-HollieNeural'
  | 'en-GB-MaisieNeural'
  | 'en-GB-NoahNeural'
  | 'en-GB-OliverNeural'
  | 'en-GB-OliviaNeural'
  | 'en-GB-ThomasNeural'
  | 'en-GB-MiaNeural'
  | 'en-HK-YanNeural'
  | 'en-HK-SamNeural'
  | 'en-IE-EmilyNeural'
  | 'en-IE-ConnorNeural'
  | 'en-IN-AaravNeural'
  | 'en-IN-AashiNeural'
  | 'en-IN-AnanyaNeural'
  | 'en-IN-KavyaNeural'
  | 'en-IN-KunalNeural'
  | 'en-IN-NeerjaNeural'
  | 'en-IN-PrabhatNeural'
  | 'en-IN-RehaanNeural'
  | 'en-IN-AartiNeural'
  | 'en-IN-ArjunNeural'
  | 'en-KE-AsiliaNeural'
  | 'en-KE-ChilembaNeural'
  | 'en-NG-EzinneNeural'
  | 'en-NG-AbeoNeural'
  | 'en-NZ-MollyNeural'
  | 'en-NZ-MitchellNeural'
  | 'en-PH-RosaNeural'
  | 'en-PH-JamesNeural'
  | 'en-SG-LunaNeural'
  | 'en-SG-WayneNeural'
  | 'en-TZ-ImaniNeural'
  | 'en-TZ-ElimuNeural'
  | 'en-US-AvaMultilingualNeural'
  | 'en-US-AndrewMultilingualNeural'
  | 'en-US-EmmaMultilingualNeural'
  | 'en-US-BrianMultilingualNeural'
  | 'en-US-AvaNeural'
  | 'en-US-AndrewNeural'
  | 'en-US-EmmaNeural'
  | 'en-US-BrianNeural'
  | 'en-US-JennyNeural'
  | 'en-US-GuyNeural'
  | 'en-US-AriaNeural'
  | 'en-US-DavisNeural'
  | 'en-US-JaneNeural'
  | 'en-US-JasonNeural'
  | 'en-US-KaiNeural'
  | 'en-US-LunaNeural'
  | 'en-US-SaraNeural'
  | 'en-US-TonyNeural'
  | 'en-US-NancyNeural'
  | 'en-US-CoraMultilingualNeural'
  | 'en-US-ChristopherMultilingualNeural'
  | 'en-US-BrandonMultilingualNeural'
  | 'en-US-AmberNeural'
  | 'en-US-AnaNeural'
  | 'en-US-AshleyNeural'
  | 'en-US-BrandonNeural'
  | 'en-US-ChristopherNeural'
  | 'en-US-CoraNeural'
  | 'en-US-ElizabethNeural'
  | 'en-US-EricNeural'
  | 'en-US-JacobNeural'
  | 'en-US-JennyMultilingualNeural'
  | 'en-US-MichelleNeural'
  | 'en-US-MonicaNeural'
  | 'en-US-RogerNeural'
  | 'en-US-RyanMultilingualNeural'
  | 'en-US-SteffanNeural'
  | 'en-US-AdamMultilingualNeural'
  | 'en-US-AIGenerate1Neural'
  | 'en-US-AIGenerate2Neural'
  | 'en-US-AlloyTurboMultilingualNeural'
  | 'en-US-AmandaMultilingualNeural'
  | 'en-US-BlueNeural'
  | 'en-US-DavisMultilingualNeural'
  | 'en-US-DerekMultilingualNeural'
  | 'en-US-DustinMultilingualNeural'
  | 'en-US-EchoTurboMultilingualNeural'
  | 'en-US-EvelynMultilingualNeural'
  | 'en-US-FableTurboMultilingualNeural'
  | 'en-US-LewisMultilingualNeural'
  | 'en-US-LolaMultilingualNeural'
  | 'en-US-NancyMultilingualNeural'
  | 'en-US-NovaTurboMultilingualNeural'
  | 'en-US-OnyxTurboMultilingualNeural'
  | 'en-US-PhoebeMultilingualNeural'
  | 'en-US-SamuelMultilingualNeural'
  | 'en-US-SerenaMultilingualNeural'
  | 'en-US-ShimmerTurboMultilingualNeural'
  | 'en-US-SteffanMultilingualNeural'
  | 'en-US-Andrew:DragonHDLatestNeural'
  | 'en-US-Andrew2:DragonHDLatestNeural'
  | 'en-US-Aria:DragonHDLatestNeural'
  | 'en-US-Ava:DragonHDLatestNeural'
  | 'en-US-Brian:DragonHDLatestNeural'
  | 'en-US-Davis:DragonHDLatestNeural'
  | 'en-US-Emma:DragonHDLatestNeural'
  | 'en-US-Emma2:DragonHDLatestNeural'
  | 'en-US-Jenny:DragonHDLatestNeural'
  | 'en-US-Steffan:DragonHDLatestNeural'
  | 'en-ZA-LeahNeural'
  | 'en-ZA-LukeNeural'
  | 'es-AR-ElenaNeural'
  | 'es-AR-TomasNeural'
  | 'es-BO-SofiaNeural'
  | 'es-BO-MarceloNeural'
  | 'es-CL-CatalinaNeural'
  | 'es-CL-LorenzoNeural'
  | 'es-CO-SalomeNeural'
  | 'es-CO-GonzaloNeural'
  | 'es-CR-MariaNeural'
  | 'es-CR-JuanNeural'
  | 'es-CU-BelkysNeural'
  | 'es-CU-ManuelNeural'
  | 'es-DO-RamonaNeural'
  | 'es-DO-EmilioNeural'
  | 'es-EC-AndreaNeural'
  | 'es-EC-LuisNeural'
  | 'es-ES-ElviraNeural'
  | 'es-ES-AlvaroNeural'
  | 'es-ES-ArabellaMultilingualNeural'
  | 'es-ES-IsidoraMultilingualNeural'
  | 'es-ES-TristanMultilingualNeural'
  | 'es-ES-XimenaMultilingualNeural'
  | 'es-ES-AbrilNeural'
  | 'es-ES-ArnauNeural'
  | 'es-ES-DarioNeural'
  | 'es-ES-EliasNeural'
  | 'es-ES-EstrellaNeural'
  | 'es-ES-IreneNeural'
  | 'es-ES-LaiaNeural'
  | 'es-ES-LiaNeural'
  | 'es-ES-NilNeural'
  | 'es-ES-SaulNeural'
  | 'es-ES-TeoNeural'
  | 'es-ES-TrianaNeural'
  | 'es-ES-VeraNeural'
  | 'es-ES-XimenaNeural'
  | 'es-GQ-TeresaNeural'
  | 'es-GQ-JavierNeural'
  | 'es-GT-MartaNeural'
  | 'es-GT-AndresNeural'
  | 'es-HN-KarlaNeural'
  | 'es-HN-CarlosNeural'
  | 'es-MX-DaliaNeural'
  | 'es-MX-JorgeNeural'
  | 'es-MX-BeatrizNeural'
  | 'es-MX-CandelaNeural'
  | 'es-MX-CarlotaNeural'
  | 'es-MX-CecilioNeural'
  | 'es-MX-GerardoNeural'
  | 'es-MX-LarissaNeural'
  | 'es-MX-LibertoNeural'
  | 'es-MX-LucianoNeural'
  | 'es-MX-MarinaNeural'
  | 'es-MX-NuriaNeural'
  | 'es-MX-PelayoNeural'
  | 'es-MX-RenataNeural'
  | 'es-MX-YagoNeural'
  | 'es-NI-YolandaNeural'
  | 'es-NI-FedericoNeural'
  | 'es-PA-MargaritaNeural'
  | 'es-PA-RobertoNeural'
  | 'es-PE-CamilaNeural'
  | 'es-PE-AlexNeural'
  | 'es-PR-KarinaNeural'
  | 'es-PR-VictorNeural'
  | 'es-PY-TaniaNeural'
  | 'es-PY-MarioNeural'
  | 'es-SV-LorenaNeural'
  | 'es-SV-RodrigoNeural'
  | 'es-US-PalomaNeural'
  | 'es-US-AlonsoNeural'
  | 'es-UY-ValentinaNeural'
  | 'es-UY-MateoNeural'
  | 'es-VE-PaolaNeural'
  | 'es-VE-SebastianNeural'
  | 'et-EE-AnuNeural'
  | 'et-EE-KertNeural'
  | 'eu-ES-AinhoaNeural'
  | 'eu-ES-AnderNeural'
  | 'fa-IR-DilaraNeural'
  | 'fa-IR-FaridNeural'
  | 'fi-FI-SelmaNeural'
  | 'fi-FI-HarriNeural'
  | 'fi-FI-NooraNeural'
  | 'fil-PH-BlessicaNeural'
  | 'fil-PH-AngeloNeural'
  | 'fr-BE-CharlineNeural'
  | 'fr-BE-GerardNeural'
  | 'fr-CA-SylvieNeural'
  | 'fr-CA-JeanNeural'
  | 'fr-CA-AntoineNeural'
  | 'fr-CA-ThierryNeural'
  | 'fr-CH-ArianeNeural'
  | 'fr-CH-FabriceNeural'
  | 'fr-FR-DeniseNeural'
  | 'fr-FR-HenriNeural'
  | 'fr-FR-VivienneMultilingualNeural'
  | 'fr-FR-RemyMultilingualNeural'
  | 'fr-FR-LucienMultilingualNeural'
  | 'fr-FR-AlainNeural'
  | 'fr-FR-BrigitteNeural'
  | 'fr-FR-CelesteNeural'
  | 'fr-FR-ClaudeNeural'
  | 'fr-FR-CoralieNeural'
  | 'fr-FR-EloiseNeural'
  | 'fr-FR-JacquelineNeural'
  | 'fr-FR-JeromeNeural'
  | 'fr-FR-JosephineNeural'
  | 'fr-FR-MauriceNeural'
  | 'fr-FR-YvesNeural'
  | 'fr-FR-YvetteNeural'
  | 'ga-IE-OrlaNeural'
  | 'ga-IE-ColmNeural'
  | 'gl-ES-SabelaNeural'
  | 'gl-ES-RoiNeural'
  | 'gu-IN-DhwaniNeural'
  | 'gu-IN-NiranjanNeural'
  | 'he-IL-HilaNeural'
  | 'he-IL-AvriNeural'
  | 'hi-IN-AaravNeural'
  | 'hi-IN-AnanyaNeural'
  | 'hi-IN-KavyaNeural'
  | 'hi-IN-KunalNeural'
  | 'hi-IN-RehaanNeural'
  | 'hi-IN-SwaraNeural'
  | 'hi-IN-MadhurNeural'
  | 'hi-IN-AartiNeural'
  | 'hi-IN-ArjunNeural'
  | 'hr-HR-GabrijelaNeural'
  | 'hr-HR-SreckoNeural'
  | 'hu-HU-NoemiNeural'
  | 'hu-HU-TamasNeural'
  | 'hy-AM-AnahitNeural'
  | 'hy-AM-HaykNeural'
  | 'id-ID-GadisNeural'
  | 'id-ID-ArdiNeural'
  | 'is-IS-GudrunNeural'
  | 'is-IS-GunnarNeural'
  | 'it-IT-ElsaNeural'
  | 'it-IT-IsabellaNeural'
  | 'it-IT-DiegoNeural'
  | 'it-IT-AlessioMultilingualNeural'
  | 'it-IT-IsabellaMultilingualNeural'
  | 'it-IT-GiuseppeMultilingualNeural'
  | 'it-IT-MarcelloMultilingualNeural'
  | 'it-IT-BenignoNeural'
  | 'it-IT-CalimeroNeural'
  | 'it-IT-CataldoNeural'
  | 'it-IT-FabiolaNeural'
  | 'it-IT-FiammaNeural'
  | 'it-IT-GianniNeural'
  | 'it-IT-GiuseppeNeural'
  | 'it-IT-ImeldaNeural'
  | 'it-IT-IrmaNeural'
  | 'it-IT-LisandroNeural'
  | 'it-IT-PalmiraNeural'
  | 'it-IT-PierinaNeural'
  | 'it-IT-RinaldoNeural'
  | 'iu-Cans-CA-SiqiniqNeural'
  | 'iu-Cans-CA-TaqqiqNeural'
  | 'iu-Latn-CA-SiqiniqNeural'
  | 'iu-Latn-CA-TaqqiqNeural'
  | 'ja-JP-NanamiNeural'
  | 'ja-JP-KeitaNeural'
  | 'ja-JP-AoiNeural'
  | 'ja-JP-DaichiNeural'
  | 'ja-JP-MayuNeural'
  | 'ja-JP-NaokiNeural'
  | 'ja-JP-ShioriNeural'
  | 'ja-JP-MasaruMultilingualNeural'
  | 'ja-JP-Masaru:DragonHDLatestNeural'
  | 'jv-ID-SitiNeural'
  | 'jv-ID-DimasNeural'
  | 'ka-GE-EkaNeural'
  | 'ka-GE-GiorgiNeural'
  | 'kk-KZ-AigulNeural'
  | 'kk-KZ-DauletNeural'
  | 'km-KH-SreymomNeural'
  | 'km-KH-PisethNeural'
  | 'kn-IN-SapnaNeural'
  | 'kn-IN-GaganNeural'
  | 'ko-KR-SunHiNeural'
  | 'ko-KR-InJoonNeural'
  | 'ko-KR-HyunsuMultilingualNeural'
  | 'ko-KR-BongJinNeural'
  | 'ko-KR-GookMinNeural'
  | 'ko-KR-HyunsuNeural'
  | 'ko-KR-JiMinNeural'
  | 'ko-KR-SeoHyeonNeural'
  | 'ko-KR-SoonBokNeural'
  | 'ko-KR-YuJinNeural'
  | 'lo-LA-KeomanyNeural'
  | 'lo-LA-ChanthavongNeural'
  | 'lt-LT-OnaNeural'
  | 'lt-LT-LeonasNeural'
  | 'lv-LV-EveritaNeural'
  | 'lv-LV-NilsNeural'
  | 'mk-MK-MarijaNeural'
  | 'mk-MK-AleksandarNeural'
  | 'ml-IN-SobhanaNeural'
  | 'ml-IN-MidhunNeural'
  | 'mn-MN-YesuiNeural'
  | 'mn-MN-BataaNeural'
  | 'mr-IN-AarohiNeural'
  | 'mr-IN-ManoharNeural'
  | 'ms-MY-YasminNeural'
  | 'ms-MY-OsmanNeural'
  | 'mt-MT-GraceNeural'
  | 'mt-MT-JosephNeural'
  | 'my-MM-NilarNeural'
  | 'my-MM-ThihaNeural'
  | 'nb-NO-PernilleNeural'
  | 'nb-NO-FinnNeural'
  | 'nb-NO-IselinNeural'
  | 'ne-NP-HemkalaNeural'
  | 'ne-NP-SagarNeural'
  | 'nl-BE-DenaNeural'
  | 'nl-BE-ArnaudNeural'
  | 'nl-NL-FennaNeural'
  | 'nl-NL-MaartenNeural'
  | 'nl-NL-ColetteNeural'
  | 'or-IN-SubhasiniNeural'
  | 'or-IN-SukantNeural'
  | 'pa-IN-OjasNeural'
  | 'pa-IN-VaaniNeural'
  | 'pl-PL-AgnieszkaNeural'
  | 'pl-PL-MarekNeural'
  | 'pl-PL-ZofiaNeural'
  | 'ps-AF-LatifaNeural'
  | 'ps-AF-GulNawazNeural'
  | 'pt-BR-FranciscaNeural'
  | 'pt-BR-AntonioNeural'
  | 'pt-BR-MacerioMultilingualNeural'
  | 'pt-BR-ThalitaMultilingualNeural'
  | 'pt-BR-BrendaNeural'
  | 'pt-BR-DonatoNeural'
  | 'pt-BR-ElzaNeural'
  | 'pt-BR-FabioNeural'
  | 'pt-BR-GiovannaNeural'
  | 'pt-BR-HumbertoNeural'
  | 'pt-BR-JulioNeural'
  | 'pt-BR-LeilaNeural'
  | 'pt-BR-LeticiaNeural'
  | 'pt-BR-ManuelaNeural'
  | 'pt-BR-NicolauNeural'
  | 'pt-BR-ThalitaNeural'
  | 'pt-BR-ValerioNeural'
  | 'pt-BR-YaraNeural'
  | 'pt-PT-RaquelNeural'
  | 'pt-PT-DuarteNeural'
  | 'pt-PT-FernandaNeural'
  | 'ro-RO-AlinaNeural'
  | 'ro-RO-EmilNeural'
  | 'ru-RU-SvetlanaNeural'
  | 'ru-RU-DmitryNeural'
  | 'ru-RU-DariyaNeural'
  | 'si-LK-ThiliniNeural'
  | 'si-LK-SameeraNeural'
  | 'sk-SK-ViktoriaNeural'
  | 'sk-SK-LukasNeural'
  | 'sl-SI-PetraNeural'
  | 'sl-SI-RokNeural'
  | 'so-SO-UbaxNeural'
  | 'so-SO-MuuseNeural'
  | 'sq-AL-AnilaNeural'
  | 'sq-AL-IlirNeural'
  | 'sr-Latn-RS-NicholasNeural'
  | 'sr-Latn-RS-SophieNeural'
  | 'sr-RS-SophieNeural'
  | 'sr-RS-NicholasNeural'
  | 'su-ID-TutiNeural'
  | 'su-ID-JajangNeural'
  | 'sv-SE-SofieNeural'
  | 'sv-SE-MattiasNeural'
  | 'sv-SE-HilleviNeural'
  | 'sw-KE-ZuriNeural'
  | 'sw-KE-RafikiNeural'
  | 'sw-TZ-RehemaNeural'
  | 'sw-TZ-DaudiNeural'
  | 'ta-IN-PallaviNeural'
  | 'ta-IN-ValluvarNeural'
  | 'ta-LK-SaranyaNeural'
  | 'ta-LK-KumarNeural'
  | 'ta-MY-KaniNeural'
  | 'ta-MY-SuryaNeural'
  | 'ta-SG-VenbaNeural'
  | 'ta-SG-AnbuNeural'
  | 'te-IN-ShrutiNeural'
  | 'te-IN-MohanNeural'
  | 'th-TH-PremwadeeNeural'
  | 'th-TH-NiwatNeural'
  | 'th-TH-AcharaNeural'
  | 'tr-TR-EmelNeural'
  | 'tr-TR-AhmetNeural'
  | 'uk-UA-PolinaNeural'
  | 'uk-UA-OstapNeural'
  | 'ur-IN-GulNeural'
  | 'ur-IN-SalmanNeural'
  | 'ur-PK-UzmaNeural'
  | 'ur-PK-AsadNeural'
  | 'uz-UZ-MadinaNeural'
  | 'uz-UZ-SardorNeural'
  | 'vi-VN-HoaiMyNeural'
  | 'vi-VN-NamMinhNeural'
  | 'wuu-CN-XiaotongNeural'
  | 'wuu-CN-YunzheNeural'
  | 'yue-CN-XiaoMinNeural'
  | 'yue-CN-YunSongNeural'
  | 'zh-CN-XiaoxiaoNeural'
  | 'zh-CN-YunxiNeural'
  | 'zh-CN-YunjianNeural'
  | 'zh-CN-XiaoyiNeural'
  | 'zh-CN-YunyangNeural'
  | 'zh-CN-XiaochenNeural'
  | 'zh-CN-XiaochenMultilingualNeural'
  | 'zh-CN-XiaohanNeural'
  | 'zh-CN-XiaomengNeural'
  | 'zh-CN-XiaomoNeural'
  | 'zh-CN-XiaoqiuNeural'
  | 'zh-CN-XiaorouNeural'
  | 'zh-CN-XiaoruiNeural'
  | 'zh-CN-XiaoshuangNeural'
  | 'zh-CN-XiaoxiaoDialectsNeural'
  | 'zh-CN-XiaoxiaoMultilingualNeural'
  | 'zh-CN-XiaoyanNeural'
  | 'zh-CN-XiaoyouNeural'
  | 'zh-CN-XiaoyuMultilingualNeural'
  | 'zh-CN-XiaozhenNeural'
  | 'zh-CN-YunfengNeural'
  | 'zh-CN-YunhaoNeural'
  | 'zh-CN-YunjieNeural'
  | 'zh-CN-YunxiaNeural'
  | 'zh-CN-YunyeNeural'
  | 'zh-CN-YunyiMultilingualNeural'
  | 'zh-CN-YunzeNeural'
  | 'zh-CN-YunfanMultilingualNeural'
  | 'zh-CN-YunxiaoMultilingualNeural'
  | 'zh-CN-Xiaochen:DragonHDLatestNeural'
  | 'zh-CN-guangxi-YunqiNeural'
  | 'zh-CN-henan-YundengNeural'
  | 'zh-CN-liaoning-XiaobeiNeural'
  | 'zh-CN-liaoning-YunbiaoNeural'
  | 'zh-CN-shaanxi-XiaoniNeural'
  | 'zh-CN-shandong-YunxiangNeural'
  | 'zh-CN-sichuan-YunxiNeural'
  | 'zh-HK-HiuMaanNeural'
  | 'zh-HK-WanLungNeural'
  | 'zh-HK-HiuGaaiNeural'
  | 'zh-TW-HsiaoChenNeural'
  | 'zh-TW-YunJheNeural'
  | 'zh-TW-HsiaoYuNeural'
  | 'zu-ZA-ThandoNeural'
  | 'zu-ZA-ThembaNeural';

export class Azure {
  private apiKey: string;
  private region: string;

  constructor(options?: {
    apiKey: string;
    region: string;
  }) {
    this.apiKey = options?.apiKey || process.env.AZURE_API_KEY || '';
    this.region = options?.region || process.env.AZURE_REGION || '';

    if (!this.apiKey) {
      throw new Error('AZURE_API_KEY is not set');
    }

    if (!this.region) {
      throw new Error('AZURE_REGION is not set');
    }
  }

  private createProvider() {
    const speechConfig = AzureSDK.SpeechConfig.fromSubscription(
      this.apiKey,
      this.region
    );

    speechConfig.speechRecognitionLanguage = 'en-US';

    return speechConfig;
  }

  private async convertToWavBuffer(audio: File) {
    const arrayBuffer = await audio.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const wavBuffer = await new Promise<Buffer>((resolve, reject) => {
      const inputStream = stream.Readable.from(inputBuffer);
      const chunks: Uint8Array[] = [];

      ffmpeg(inputStream)
        .toFormat('wav')
        .on('error', reject)
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        })
        .pipe(
          new stream.Writable({
            write(chunk: Buffer, _, callback) {
              const part = new Uint8Array(chunk.buffer);
              chunks.push(part);
              callback();
            },
          })
        );
    });

    return wavBuffer;
  }

  /**
   * Creates a text-to-speech synthesis function using Azure Speech Service
   * @param {AzureVoice} voice - The neural voice to use for synthesis. Defaults to 'en-US-AriaNeural'
   * @returns {Function} Async function that takes text and returns synthesized audio
   */
  tts(voice: AzureVoice = 'en-US-AriaNeural') {
    const provider = this.createProvider();
    provider.speechSynthesisVoiceName = voice;

    const generate: SpeakOptions['model']['generate'] = async (
      prompt: string
    ) => {
      const speechSynthesizer = new AzureSDK.SpeechSynthesizer(provider);

      const result = new Promise<ArrayBuffer>((resolve, reject) => {
        speechSynthesizer.speakTextAsync(
          prompt,
          (result) => {
            speechSynthesizer.close();
            resolve(result.audioData);
          },
          (error) => {
            speechSynthesizer.close();
            reject(error);
          }
        );
      });

      const audio = await result;
      const file = new File([audio], 'speech.wav', {
        type: 'audio/wav',
      });

      return file;
    };

    const stream: SpeakOptions['model']['stream'] = async (prompt: string) => {
      return new ReadableStream({
        start(controller) {
          const speechSynthesizer = new AzureSDK.SpeechSynthesizer(provider);

          speechSynthesizer.speakTextAsync(
            prompt,
            (result) => {
              const audioData = new Uint8Array(result.audioData);
              controller.enqueue(audioData);
              controller.close();
              speechSynthesizer.close();
            },
            (error) => {
              controller.error(error);
              speechSynthesizer.close();
            }
          );
        },
      });
    };

    return { generate, stream };
  }

  /**
   * Creates a speech-to-text transcription function using Azure Speech Service
   * @returns {Function} Async function that takes audio and returns transcribed text
   */
  stt() {
    const provider = this.createProvider();

    const generate: TranscribeOptions['model']['generate'] = async (
      audio: File
    ) => {
      const buffer = audio.type.includes('wav')
        ? Buffer.from(await audio.arrayBuffer())
        : await this.convertToWavBuffer(audio);

      const audioConfig = AzureSDK.AudioConfig.fromWavFileInput(buffer);
      const speechRecognizer = new AzureSDK.SpeechRecognizer(
        provider,
        audioConfig
      );

      const result = await new Promise<string | null>((resolve, reject) => {
        speechRecognizer.recognizeOnceAsync(
          (result) => {
            speechRecognizer.close();

            switch (result.reason) {
              case AzureSDK.ResultReason.RecognizedSpeech:
                resolve(result.text);
                break;
              case AzureSDK.ResultReason.NoMatch:
                resolve(null);
                break;
              case AzureSDK.ResultReason.Canceled:
                reject(AzureSDK.CancellationDetails.fromResult(result).reason);
                break;
              default:
                resolve(null);
            }
          },
          (error) => {
            speechRecognizer.close();
            reject(error);
          }
        );
      });

      if (!result) {
        throw new Error('No text returned.');
      }

      return result;
    };

    const stream: TranscribeOptions['model']['stream'] = async (
      audio: File
    ) => {
      const buffer = audio.type.includes('wav')
        ? Buffer.from(await audio.arrayBuffer())
        : await this.convertToWavBuffer(audio);

      const audioConfig = AzureSDK.AudioConfig.fromWavFileInput(buffer);
      const speechRecognizer = new AzureSDK.SpeechRecognizer(
        provider,
        audioConfig
      );

      return new ReadableStream({
        start(controller) {
          speechRecognizer.recognizeOnceAsync(
            (result) => {
              controller.enqueue(result.text);
              controller.close();
              speechRecognizer.close();
            },
            (error) => {
              controller.error(error);
              speechRecognizer.close();
            }
          );
        },
      });
    };

    return { generate, stream };
  }
}
