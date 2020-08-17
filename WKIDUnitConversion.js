// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.

define(["dojo/has","./kernel"],(function(r,o){var f,e={values:[1,.3048,.3048006096012192,.3047972654,.9143917962,.201166195164,.9143984146160287,.3047994715386762,20.11676512155263,20.11678249437587,.9143985307444408,.91439523,.3047997101815088,20.116756,5e4,15e4],units:["Meter","Foot","Foot_US","Foot_Clarke","Yard_Clarke","Link_Clarke","Yard_Sears","Foot_Sears","Chain_Sears","Chain_Benoit_1895_B","Yard_Indian","Yard_Indian_1937","Foot_Gold_Coast","Chain_Sears_1922_Truncated","50_Kilometers","150_Kilometers"],2066:5,2136:12,2155:2,2157:0,2158:0,2159:12,2160:12,2204:2,2219:0,2220:0,2254:2,2255:2,2256:1,2265:1,2266:1,2267:2,2268:2,2269:1,2270:1,2271:2,2272:2,2273:1,2294:0,2295:0,2314:3,2899:2,2900:2,2901:1,2909:1,2910:1,2911:2,2912:2,2913:1,2914:1,2992:1,2993:0,2994:1,3080:1,3089:2,3090:0,3091:2,3102:2,3141:0,3142:0,3167:13,3359:2,3360:0,3361:1,3362:0,3363:2,3364:0,3365:2,3366:3,3404:2,3405:0,3406:0,3407:3,3439:0,3440:0,3479:1,3480:0,3481:1,3482:0,3483:1,3484:0,3485:2,3486:0,3487:2,3488:0,3489:0,3490:2,3491:0,3492:2,3493:0,3494:2,3495:0,3496:2,3497:0,3498:2,3499:0,3500:2,3501:0,3502:2,3503:0,3504:2,3505:0,3506:2,3507:0,3508:2,3509:0,3510:2,3511:0,3512:2,3513:0,3514:0,3515:2,3516:0,3517:2,3518:0,3519:2,3520:0,3521:2,3522:0,3523:2,3524:0,3525:2,3526:0,3527:2,3528:0,3529:2,3530:0,3531:2,3532:0,3533:2,3534:0,3535:2,3536:0,3537:2,3538:0,3539:2,3540:0,3541:2,3542:0,3543:2,3544:0,3545:2,3546:0,3547:2,3548:0,3549:2,3550:0,3551:2,3552:0,3553:2,3582:2,3583:0,3584:2,3585:0,3586:2,3587:0,3588:1,3589:0,3590:1,3591:0,3592:0,3593:1,3598:2,3599:0,3600:2,3605:1,3606:0,3607:0,3608:2,3609:0,3610:2,3611:0,3612:2,3613:0,3614:2,3615:0,3616:2,3617:0,3618:2,3619:0,3620:2,3621:0,3622:2,3623:0,3624:2,3625:0,3626:2,3627:0,3628:2,3629:0,3630:2,3631:0,3632:2,3633:0,3634:1,3635:0,3636:1,3640:2,3641:0,3642:2,3643:0,3644:1,3645:0,3646:1,3647:0,3648:1,3649:0,3650:2,3651:0,3652:2,3653:0,3654:2,3655:0,3656:1,3657:0,3658:2,3659:0,3660:2,3661:0,3662:2,3663:0,3664:2,3668:2,3669:0,3670:2,3671:0,3672:2,3673:0,3674:2,3675:0,3676:1,3677:2,3678:0,3679:1,3680:2,3681:0,3682:1,3683:2,3684:0,3685:0,3686:2,3687:0,3688:2,3689:0,3690:2,3691:0,3692:2,3696:2,3697:0,3698:2,3699:0,3700:2,3793:0,3794:0,3812:0,3854:0,3857:0,3920:0,3978:0,3979:0,3991:2,3992:2,4026:0,4037:0,4038:0,4071:0,4082:0,4083:0,4087:0,4088:0,4217:2,4414:0,4415:0,4417:0,4434:0,4437:0,4438:2,4439:2,4462:0,4467:0,4471:0,4474:0,4559:0,4647:0,4822:0,4826:0,4839:0,5018:0,5048:0,5167:0,5168:0,5221:0,5223:0,5234:0,5235:0,5243:0,5247:0,5266:0,5316:0,5320:0,5321:0,5325:0,5337:0,5361:0,5362:0,5367:0,5382:0,5383:0,5396:0,5456:0,5457:0,5469:0,5472:4,5490:0,5513:0,5514:0,5523:0,5559:0,5588:1,5589:3,5596:0,5627:0,5629:0,5641:0,5643:0,5644:0,5646:2,5654:2,5655:2,5659:0,5700:0,5825:0,5836:0,5837:0,5839:0,5842:0,5844:0,5858:0,5879:0,5880:0,5887:0,5890:0,6128:1,6129:1,6141:1,6204:0,6210:0,6211:0,6307:0,6312:0,6316:0,6362:0,6391:1,6405:1,6406:0,6407:1,6408:0,6409:1,6410:0,6411:2,6412:0,6413:2,6414:0,6415:0,6416:2,6417:0,6418:2,6419:0,6420:2,6421:0,6422:2,6423:0,6424:2,6425:0,6426:2,6427:0,6428:2,6429:0,6430:2,6431:0,6432:2,6433:0,6434:2,6435:0,6436:2,6437:0,6438:2,6439:0,6440:0,6441:2,6442:0,6443:2,6444:0,6445:2,6446:0,6447:2,6448:0,6449:2,6450:0,6451:2,6452:0,6453:2,6454:0,6455:2,6456:0,6457:2,6458:0,6459:2,6460:0,6461:2,6462:0,6463:2,6464:0,6465:2,6466:0,6467:2,6468:0,6469:2,6470:0,6471:2,6472:0,6473:2,6474:0,6475:2,6476:0,6477:2,6478:0,6479:2,6484:2,6485:0,6486:2,6487:0,6488:2,6489:0,6490:2,6491:0,6492:2,6493:0,6494:1,6495:0,6496:1,6497:0,6498:0,6499:1,6500:0,6501:2,6502:0,6503:2,6504:0,6505:2,6506:0,6507:2,6508:0,6509:0,6510:2,6515:1,6516:0,6518:0,6519:2,6520:0,6521:2,6522:0,6523:2,6524:0,6525:2,6526:0,6527:2,6528:0,6529:2,6530:0,6531:2,6532:0,6533:2,6534:0,6535:2,6536:0,6537:2,6538:0,6539:2,6540:0,6541:2,6542:0,6543:2,6544:0,6545:1,6546:0,6547:1,6548:0,6549:2,6550:0,6551:2,6552:0,6553:2,6554:0,6555:2,6556:0,6557:1,6558:0,6559:1,6560:0,6561:1,6562:0,6563:2,6564:0,6565:2,6566:0,6567:0,6568:2,6569:0,6570:1,6571:0,6572:2,6573:0,6574:2,6575:0,6576:2,6577:0,6578:2,6582:2,6583:0,6584:2,6585:0,6586:2,6587:0,6588:2,6589:0,6590:2,6591:0,6592:0,6593:2,6594:0,6595:2,6596:0,6597:2,6598:0,6599:2,6600:0,6601:2,6602:0,6603:2,6605:2,6606:0,6607:2,6608:0,6609:2,6610:0,6611:0,6612:2,6613:0,6614:2,6615:0,6616:2,6617:0,6618:2,6633:2,6646:0,6703:0,6784:0,6785:1,6786:0,6787:1,6788:0,6789:1,6790:0,6791:1,6792:0,6793:1,6794:0,6795:1,6796:0,6797:1,6798:0,6799:1,6800:0,6801:1,6802:0,6803:1,6804:0,6805:1,6806:0,6807:1,6808:0,6809:1,6810:0,6811:1,6812:0,6813:1,6814:0,6815:1,6816:0,6817:1,6818:0,6819:1,6820:0,6821:1,6822:0,6823:1,6824:0,6825:1,6826:0,6827:1,6828:0,6829:1,6830:0,6831:1,6832:0,6833:1,6834:0,6835:1,6836:0,6837:1,6838:0,6839:1,6840:0,6841:1,6842:0,6843:1,6844:0,6845:1,6846:0,6847:1,6848:0,6849:1,6850:0,6851:1,6852:0,6853:1,6854:0,6855:1,6856:0,6857:1,6858:0,6859:1,6860:0,6861:1,6862:0,6863:1,6867:0,6868:1,6870:0,6875:0,6876:0,6879:0,6880:2,6884:0,6885:1,6886:0,6887:1,6915:0,6922:0,6923:2,6924:0,6925:2,6962:0,6984:0,6991:0,7128:2,7131:0,7132:2,7142:0,7257:0,7258:2,7259:0,7260:2,7261:0,7262:2,7263:0,7264:2,7265:0,7266:2,7267:0,7268:2,7269:0,7270:2,7271:0,7272:2,7273:0,7274:2,7275:0,7276:2,7277:0,7278:2,7279:0,7280:2,7281:0,7282:2,7283:0,7284:2,7285:0,7286:2,7287:0,7288:2,7289:0,7290:2,7291:0,7292:2,7293:0,7294:2,7295:0,7296:2,7297:0,7298:2,7299:0,7300:2,7301:0,7302:2,7303:0,7304:2,7305:0,7306:2,7307:0,7308:2,7309:0,7310:2,7311:0,7312:2,7313:0,7314:2,7315:0,7316:2,7317:0,7318:2,7319:0,7320:2,7321:0,7322:2,7323:0,7324:2,7325:0,7326:2,7327:0,7328:2,7329:0,7330:2,7331:0,7332:2,7333:0,7334:2,7335:0,7336:2,7337:0,7338:2,7339:0,7340:2,7341:0,7342:2,7343:0,7344:2,7345:0,7346:2,7347:0,7348:2,7349:0,7350:2,7351:0,7352:2,7353:0,7354:2,7355:0,7356:2,7357:0,7358:2,7359:0,7360:2,7361:0,7362:2,7363:0,7364:2,7365:0,7366:2,7367:0,7368:2,7369:0,7370:2,7877:0,7878:0,7882:0,7883:0,7887:0,7899:0,7991:0,7992:0,8035:2,8036:2,8058:0,8059:0,8082:0,8083:0,8088:0,8090:0,8091:2,8092:0,8093:2,8095:0,8096:2,8097:0,8098:2,8099:0,8100:2,8101:0,8102:2,8103:0,8104:2,8105:0,8106:2,8107:0,8108:2,8109:0,8110:2,8111:0,8112:2,8113:0,8114:2,8115:0,8116:2,8117:0,8118:2,8119:0,8120:2,8121:0,8122:2,8123:0,8124:2,8125:0,8126:2,8127:0,8128:2,8129:0,8130:2,8131:0,8132:2,8133:0,8134:2,8135:0,8136:2,8137:0,8138:2,8139:0,8140:2,8141:0,8142:2,8143:0,8144:2,8145:0,8146:2,8147:0,8148:2,8149:0,8150:2,8151:0,8152:2,8153:0,8154:2,8155:0,8156:2,8157:0,8158:2,8159:0,8160:2,8161:0,8162:2,8163:0,8164:2,8165:0,8166:2,8167:0,8168:2,8169:0,8170:2,8171:0,8172:2,8173:0,8177:2,8179:0,8180:2,8181:0,8182:2,8184:0,8185:2,8187:0,8189:2,8191:0,8193:2,8196:0,8197:2,8198:0,8200:2,8201:0,8202:2,8203:0,8204:2,8205:0,8206:2,8207:0,8208:2,8209:0,8210:2,8212:0,8213:2,8214:0,8216:2,8218:0,8220:2,8222:0,8224:2,8225:0,8226:2,8311:0,8312:1,8313:0,8314:1,8315:0,8316:1,8317:0,8318:1,8319:0,8320:1,8321:0,8322:1,8323:0,8324:1,8325:0,8326:1,8327:0,8328:1,8329:0,8330:1,8331:0,8332:1,8333:0,8334:1,8335:0,8336:1,8337:0,8338:1,8339:0,8340:1,8341:0,8342:1,8343:0,8344:1,8345:0,8346:1,8347:0,8348:1,8352:0,8353:0,8379:0,8380:2,8381:0,8382:2,8383:0,8384:2,8385:0,8387:2,8391:0,8395:0,8433:0,8441:0,8455:0,8456:0,8531:2,8682:0,8686:0,8687:0,8692:0,8693:0,8826:0,8903:0,8950:0,8951:0,9039:0,9040:0,9141:0,9149:0,9150:0,9191:0,9221:0,9222:0,9249:0,9250:0,9252:0,9254:0,9265:0,9284:0,9285:0,20499:0,20538:0,20539:0,20790:0,20791:0,21291:0,21292:0,21500:0,21817:0,21818:0,22032:0,22033:0,22091:0,22092:0,22332:0,22391:0,22392:0,22700:0,22770:0,22780:0,22832:0,23090:0,23095:0,23239:0,23240:0,23433:0,23700:0,24047:0,24048:0,24100:3,24200:0,24305:0,24306:0,24382:10,24383:0,24500:0,24547:0,24548:0,24571:9,24600:0,25e3:0,25231:0,25884:0,25932:0,26237:0,26331:0,26332:0,26432:0,26591:0,26592:0,26632:0,26692:0,27120:0,27200:0,27291:6,27292:6,27429:0,27492:0,27493:0,27500:0,27700:0,28232:0,28600:0,28991:0,28992:0,29100:0,29101:0,29220:0,29221:0,29333:0,29635:0,29636:0,29701:0,29738:0,29739:0,29849:0,29850:0,29871:8,29872:7,29873:0,30200:5,30339:0,30340:0,30591:0,30592:0,30791:0,30792:0,30800:0,31028:0,31121:0,31154:0,31170:0,31171:0,31370:0,31528:0,31529:0,31600:0,31700:0,31838:0,31839:0,31900:0,31901:0,32061:0,32062:0,32098:0,32099:2,32100:0,32104:0,32161:0,32766:0,53048:0,53049:0,54090:0,54091:0,65061:2,65062:2,65161:0,65163:0,102041:2,102064:11,102068:14,102069:15,102118:2,102119:1,102120:2,102121:2,102217:2,102218:0,102219:2,102220:2,102378:1,102379:1,102380:0,102381:1,102589:2,102599:2,102600:2,102604:2,102647:0,102704:2,102705:2,102706:0,102761:2,102762:0,102763:2,102764:0,102765:0,102766:2,102962:0,102963:0,102970:1,102974:2,102993:0,102994:0,102995:2,102996:2,103015:0,103016:2,103017:0,103018:2,103025:0,103026:0,103027:2,103028:2,103035:0,103036:0,103037:2,103038:2,103039:0,103040:0,103041:2,103042:2,103043:0,103044:0,103045:2,103046:2,103047:0,103048:0,103049:2,103050:2,103051:0,103052:2,103053:0,103054:2,103055:0,103056:2,103057:0,103058:0,103059:2,103060:2,103061:0,103062:0,103063:2,103064:2,103069:2,103070:0,103071:0,103072:2,103073:2,103086:0,103087:0,103088:2,103089:2,103094:1,103095:0,103096:2,103103:0,103104:2,103105:0,103106:2,103121:0,103122:2,103123:0,103124:0,103125:1,103126:1,103127:0,103128:0,103129:2,103130:2,103131:0,103132:0,103133:2,103134:2,103135:0,103136:0,103137:1,103138:1,103139:0,103140:2,103141:0,103142:2,103143:0,103144:2,103145:0,103146:1,103147:0,103148:0,103149:2,103150:2,103151:0,103152:2,103172:0,103173:2,103174:0,103175:0,103176:2,103177:2,103178:0,103179:0,103180:2,103181:2,103182:0,103183:0,103184:2,103185:2,103228:0,103229:0,103230:2,103231:2,103250:0,103251:2,103252:0,103253:2,103260:0,103261:0,103262:2,103263:2,103270:0,103271:0,103272:2,103273:2,103274:0,103275:0,103276:2,103277:2,103278:0,103279:0,103280:2,103281:2,103282:0,103283:0,103284:2,103285:2,103286:0,103287:2,103288:0,103289:2,103290:0,103291:2,103292:0,103293:0,103294:2,103295:2,103296:0,103297:0,103298:2,103299:2,103376:2,103377:0,103378:0,103379:2,103380:2,103393:0,103394:0,103395:2,103396:2,103472:0,103473:1,103474:0,103475:2,103482:0,103483:2,103484:0,103485:2,103500:0,103501:2,103502:0,103503:0,103504:1,103505:1,103506:0,103507:0,103508:2,103509:2,103510:0,103511:0,103512:2,103513:2,103514:0,103515:2,103516:0,103517:2,103518:0,103519:2,103520:0,103521:1,103522:0,103523:0,103524:2,103525:2,103526:0,103527:2,103561:2,103562:2,103563:0,103564:0,103565:2,103566:2,103567:0,103568:0,103569:2,103570:2,103584:0,103585:2,103586:0,103587:2,103588:1,103589:0,103590:2,103591:1,103592:0,103593:2,103594:1,103695:2};for(f=2e3;f<=2045;f++)e[f]=0;for(f=2056;f<=2065;f++)e[f]=0;for(f=2067;f<=2135;f++)e[f]=0;for(f=2137;f<=2154;f++)e[f]=0;for(f=2161;f<=2170;f++)e[f]=0;for(f=2172;f<=2193;f++)e[f]=0;for(f=2195;f<=2198;f++)e[f]=0;for(f=2200;f<=2203;f++)e[f]=0;for(f=2205;f<=2217;f++)e[f]=0;for(f=2222;f<=2224;f++)e[f]=1;for(f=2225;f<=2250;f++)e[f]=2;for(f=2251;f<=2253;f++)e[f]=1;for(f=2257;f<=2264;f++)e[f]=2;for(f=2274;f<=2279;f++)e[f]=2;for(f=2280;f<=2282;f++)e[f]=1;for(f=2283;f<=2289;f++)e[f]=2;for(f=2290;f<=2292;f++)e[f]=0;for(f=2308;f<=2313;f++)e[f]=0;for(f=2315;f<=2491;f++)e[f]=0;for(f=2494;f<=2866;f++)e[f]=0;for(f=2867;f<=2869;f++)e[f]=1;for(f=2870;f<=2888;f++)e[f]=2;for(f=2891;f<=2895;f++)e[f]=2;for(f=2896;f<=2898;f++)e[f]=1;for(f=2902;f<=2908;f++)e[f]=2;for(f=2915;f<=2920;f++)e[f]=2;for(f=2921;f<=2923;f++)e[f]=1;for(f=2924;f<=2930;f++)e[f]=2;for(f=2931;f<=2962;f++)e[f]=0;for(f=2964;f<=2968;f++)e[f]=2;for(f=2969;f<=2973;f++)e[f]=0;for(f=2975;f<=2991;f++)e[f]=0;for(f=2995;f<=3051;f++)e[f]=0;for(f=3054;f<=3079;f++)e[f]=0;for(f=3081;f<=3088;f++)e[f]=0;for(f=3092;f<=3101;f++)e[f]=0;for(f=3106;f<=3138;f++)e[f]=0;for(f=3146;f<=3151;f++)e[f]=0;for(f=3153;f<=3166;f++)e[f]=0;for(f=3168;f<=3172;f++)e[f]=0;for(f=3174;f<=3203;f++)e[f]=0;for(f=3294;f<=3358;f++)e[f]=0;for(f=3367;f<=3403;f++)e[f]=0;for(f=3408;f<=3416;f++)e[f]=0;for(f=3417;f<=3438;f++)e[f]=2;for(f=3441;f<=3446;f++)e[f]=2;for(f=3447;f<=3450;f++)e[f]=0;for(f=3451;f<=3459;f++)e[f]=2;for(f=3460;f<=3478;f++)e[f]=0;for(f=3554;f<=3559;f++)e[f]=0;for(f=3560;f<=3570;f++)e[f]=2;for(f=3571;f<=3581;f++)e[f]=0;for(f=3594;f<=3597;f++)e[f]=0;for(f=3601;f<=3604;f++)e[f]=0;for(f=3637;f<=3639;f++)e[f]=0;for(f=3665;f<=3667;f++)e[f]=0;for(f=3693;f<=3695;f++)e[f]=0;for(f=3701;f<=3727;f++)e[f]=0;for(f=3728;f<=3739;f++)e[f]=2;for(f=3740;f<=3751;f++)e[f]=0;for(f=3753;f<=3760;f++)e[f]=2;for(f=3761;f<=3773;f++)e[f]=0;for(f=3775;f<=3777;f++)e[f]=0;for(f=3779;f<=3781;f++)e[f]=0;for(f=3783;f<=3785;f++)e[f]=0;for(f=3788;f<=3791;f++)e[f]=0;for(f=3797;f<=3802;f++)e[f]=0;for(f=3814;f<=3816;f++)e[f]=0;for(f=3825;f<=3829;f++)e[f]=0;for(f=3832;f<=3841;f++)e[f]=0;for(f=3844;f<=3852;f++)e[f]=0;for(f=3873;f<=3885;f++)e[f]=0;for(f=3890;f<=3893;f++)e[f]=0;for(f=3907;f<=3912;f++)e[f]=0;for(f=3942;f<=3950;f++)e[f]=0;for(f=3968;f<=3970;f++)e[f]=0;for(f=3973;f<=3976;f++)e[f]=0;for(f=3986;f<=3989;f++)e[f]=0;for(f=3994;f<=3997;f++)e[f]=0;for(f=4048;f<=4051;f++)e[f]=0;for(f=4056;f<=4063;f++)e[f]=0;for(f=4093;f<=4096;f++)e[f]=0;for(f=4390;f<=4398;f++)e[f]=0;for(f=4399;f<=4413;f++)e[f]=2;for(f=4418;f<=4433;f++)e[f]=2;for(f=4455;f<=4457;f++)e[f]=2;for(f=4484;f<=4489;f++)e[f]=0;for(f=4491;f<=4554;f++)e[f]=0;for(f=4568;f<=4589;f++)e[f]=0;for(f=4652;f<=4656;f++)e[f]=0;for(f=4766;f<=4800;f++)e[f]=0;for(f=5014;f<=5016;f++)e[f]=0;for(f=5069;f<=5072;f++)e[f]=0;for(f=5105;f<=5130;f++)e[f]=0;for(f=5173;f<=5188;f++)e[f]=0;for(f=5253;f<=5259;f++)e[f]=0;for(f=5269;f<=5275;f++)e[f]=0;for(f=5292;f<=5311;f++)e[f]=0;for(f=5329;f<=5331;f++)e[f]=0;for(f=5343;f<=5349;f++)e[f]=0;for(f=5355;f<=5357;f++)e[f]=0;for(f=5387;f<=5389;f++)e[f]=0;for(f=5459;f<=5463;f++)e[f]=0;for(f=5479;f<=5482;f++)e[f]=0;for(f=5518;f<=5520;f++)e[f]=0;for(f=5530;f<=5539;f++)e[f]=0;for(f=5550;f<=5552;f++)e[f]=0;for(f=5562;f<=5583;f++)e[f]=0;for(f=5623;f<=5625;f++)e[f]=2;for(f=5631;f<=5639;f++)e[f]=0;for(f=5649;f<=5653;f++)e[f]=0;for(f=5663;f<=5680;f++)e[f]=0;for(f=5682;f<=5685;f++)e[f]=0;for(f=5875;f<=5877;f++)e[f]=0;for(f=5896;f<=5899;f++)e[f]=0;for(f=5921;f<=5940;f++)e[f]=0;for(f=6050;f<=6125;f++)e[f]=0;for(f=6244;f<=6275;f++)e[f]=0;for(f=6328;f<=6348;f++)e[f]=0;for(f=6350;f<=6356;f++)e[f]=0;for(f=6366;f<=6372;f++)e[f]=0;for(f=6381;f<=6387;f++)e[f]=0;for(f=6393;f<=6404;f++)e[f]=0;for(f=6480;f<=6483;f++)e[f]=0;for(f=6511;f<=6514;f++)e[f]=0;for(f=6579;f<=6581;f++)e[f]=0;for(f=6619;f<=6624;f++)e[f]=0;for(f=6625;f<=6627;f++)e[f]=2;for(f=6628;f<=6632;f++)e[f]=0;for(f=6634;f<=6637;f++)e[f]=0;for(f=6669;f<=6692;f++)e[f]=0;for(f=6707;f<=6709;f++)e[f]=0;for(f=6720;f<=6723;f++)e[f]=0;for(f=6732;f<=6738;f++)e[f]=0;for(f=6931;f<=6933;f++)e[f]=0;for(f=6956;f<=6959;f++)e[f]=0;for(f=7005;f<=7007;f++)e[f]=0;for(f=7057;f<=7070;f++)e[f]=2;for(f=7074;f<=7082;f++)e[f]=0;for(f=7109;f<=7118;f++)e[f]=0;for(f=7119;f<=7127;f++)e[f]=1;for(f=7374;f<=7376;f++)e[f]=0;for(f=7528;f<=7586;f++)e[f]=0;for(f=7587;f<=7645;f++)e[f]=2;for(f=7692;f<=7696;f++)e[f]=0;for(f=7755;f<=7787;f++)e[f]=0;for(f=7791;f<=7795;f++)e[f]=0;for(f=7799;f<=7801;f++)e[f]=0;for(f=7803;f<=7805;f++)e[f]=0;for(f=7825;f<=7831;f++)e[f]=0;for(f=7845;f<=7859;f++)e[f]=0;for(f=8013;f<=8032;f++)e[f]=0;for(f=8065;f<=8068;f++)e[f]=1;for(f=8518;f<=8529;f++)e[f]=2;for(f=8533;f<=8536;f++)e[f]=2;for(f=8538;f<=8540;f++)e[f]=2;for(f=8677;f<=8679;f++)e[f]=0;for(f=8836;f<=8840;f++)e[f]=0;for(f=8857;f<=8859;f++)e[f]=0;for(f=8908;f<=8910;f++)e[f]=0;for(f=9154;f<=9159;f++)e[f]=0;for(f=9205;f<=9218;f++)e[f]=0;for(f=9271;f<=9273;f++)e[f]=0;for(f=20002;f<=20032;f++)e[f]=0;for(f=20062;f<=20092;f++)e[f]=0;for(f=20135;f<=20138;f++)e[f]=0;for(f=20248;f<=20258;f++)e[f]=0;for(f=20348;f<=20358;f++)e[f]=0;for(f=20436;f<=20440;f++)e[f]=0;for(f=20822;f<=20824;f++)e[f]=0;for(f=20934;f<=20936;f++)e[f]=0;for(f=21035;f<=21037;f++)e[f]=0;for(f=21095;f<=21097;f++)e[f]=0;for(f=21148;f<=21150;f++)e[f]=0;for(f=21413;f<=21423;f++)e[f]=0;for(f=21453;f<=21463;f++)e[f]=0;for(f=21473;f<=21483;f++)e[f]=0;for(f=21780;f<=21782;f++)e[f]=0;for(f=21891;f<=21894;f++)e[f]=0;for(f=21896;f<=21899;f++)e[f]=0;for(f=22171;f<=22177;f++)e[f]=0;for(f=22181;f<=22187;f++)e[f]=0;for(f=22191;f<=22197;f++)e[f]=0;for(f=22234;f<=22236;f++)e[f]=0;for(f=22521;f<=22525;f++)e[f]=0;for(f=22991;f<=22994;f++)e[f]=0;for(f=23028;f<=23038;f++)e[f]=0;for(f=23830;f<=23853;f++)e[f]=0;for(f=23866;f<=23872;f++)e[f]=0;for(f=23877;f<=23884;f++)e[f]=0;for(f=23886;f<=23894;f++)e[f]=0;for(f=23946;f<=23948;f++)e[f]=0;for(f=24311;f<=24313;f++)e[f]=0;for(f=24342;f<=24347;f++)e[f]=0;for(f=24370;f<=24374;f++)e[f]=10;for(f=24375;f<=24381;f++)e[f]=0;for(f=24718;f<=24721;f++)e[f]=0;for(f=24817;f<=24821;f++)e[f]=0;for(f=24877;f<=24882;f++)e[f]=0;for(f=24891;f<=24893;f++)e[f]=0;for(f=25391;f<=25395;f++)e[f]=0;for(f=25828;f<=25838;f++)e[f]=0;for(f=26191;f<=26195;f++)e[f]=0;for(f=26391;f<=26393;f++)e[f]=0;for(f=26701;f<=26722;f++)e[f]=0;for(f=26729;f<=26799;f++)e[f]=2;for(f=26801;f<=26803;f++)e[f]=2;for(f=26811;f<=26813;f++)e[f]=2;for(f=26847;f<=26870;f++)e[f]=2;for(f=26891;f<=26899;f++)e[f]=0;for(f=26901;f<=26923;f++)e[f]=0;for(f=26929;f<=26946;f++)e[f]=0;for(f=26948;f<=26998;f++)e[f]=0;for(f=27037;f<=27040;f++)e[f]=0;for(f=27205;f<=27232;f++)e[f]=0;for(f=27258;f<=27260;f++)e[f]=0;for(f=27391;f<=27398;f++)e[f]=0;for(f=27561;f<=27564;f++)e[f]=0;for(f=27571;f<=27574;f++)e[f]=0;for(f=27581;f<=27584;f++)e[f]=0;for(f=27591;f<=27594;f++)e[f]=0;for(f=28191;f<=28193;f++)e[f]=0;for(f=28348;f<=28358;f++)e[f]=0;for(f=28402;f<=28432;f++)e[f]=0;for(f=28462;f<=28492;f++)e[f]=0;for(f=29118;f<=29122;f++)e[f]=0;for(f=29168;f<=29172;f++)e[f]=0;for(f=29177;f<=29185;f++)e[f]=0;for(f=29187;f<=29195;f++)e[f]=0;for(f=29900;f<=29903;f++)e[f]=0;for(f=30161;f<=30179;f++)e[f]=0;for(f=30491;f<=30494;f++)e[f]=0;for(f=30729;f<=30732;f++)e[f]=0;for(f=31251;f<=31259;f++)e[f]=0;for(f=31265;f<=31268;f++)e[f]=0;for(f=31275;f<=31279;f++)e[f]=0;for(f=31281;f<=31297;f++)e[f]=0;for(f=31461;f<=31469;f++)e[f]=0;for(f=31491;f<=31495;f++)e[f]=0;for(f=31917;f<=31922;f++)e[f]=0;for(f=31965;f<=32e3;f++)e[f]=0;for(f=32001;f<=32003;f++)e[f]=2;for(f=32005;f<=32031;f++)e[f]=2;for(f=32033;f<=32060;f++)e[f]=2;for(f=32064;f<=32067;f++)e[f]=2;for(f=32074;f<=32077;f++)e[f]=2;for(f=32081;f<=32086;f++)e[f]=0;for(f=32107;f<=32130;f++)e[f]=0;for(f=32133;f<=32158;f++)e[f]=0;for(f=32164;f<=32167;f++)e[f]=2;for(f=32180;f<=32199;f++)e[f]=0;for(f=32201;f<=32260;f++)e[f]=0;for(f=32301;f<=32360;f++)e[f]=0;for(f=32601;f<=32662;f++)e[f]=0;for(f=32664;f<=32667;f++)e[f]=2;for(f=32701;f<=32761;f++)e[f]=0;for(f=53001;f<=53004;f++)e[f]=0;for(f=53008;f<=53019;f++)e[f]=0;for(f=53021;f<=53032;f++)e[f]=0;for(f=53034;f<=53037;f++)e[f]=0;for(f=53042;f<=53046;f++)e[f]=0;for(f=53074;f<=53080;f++)e[f]=0;for(f=54001;f<=54004;f++)e[f]=0;for(f=54008;f<=54019;f++)e[f]=0;for(f=54021;f<=54032;f++)e[f]=0;for(f=54034;f<=54037;f++)e[f]=0;for(f=54042;f<=54046;f++)e[f]=0;for(f=54048;f<=54053;f++)e[f]=0;for(f=54074;f<=54080;f++)e[f]=0;for(f=54098;f<=54101;f++)e[f]=0;for(f=102001;f<=102040;f++)e[f]=0;for(f=102042;f<=102063;f++)e[f]=0;for(f=102065;f<=102067;f++)e[f]=0;for(f=102070;f<=102117;f++)e[f]=0;for(f=102122;f<=102216;f++)e[f]=0;for(f=102221;f<=102377;f++)e[f]=0;for(f=102382;f<=102388;f++)e[f]=0;for(f=102389;f<=102398;f++)e[f]=2;for(f=102399;f<=102444;f++)e[f]=0;for(f=102445;f<=102447;f++)e[f]=2;for(f=102448;f<=102458;f++)e[f]=0;for(f=102459;f<=102468;f++)e[f]=2;for(f=102469;f<=102499;f++)e[f]=0;for(f=102500;f<=102519;f++)e[f]=1;for(f=102520;f<=102524;f++)e[f]=0;for(f=102525;f<=102529;f++)e[f]=2;for(f=102530;f<=102588;f++)e[f]=0;for(f=102590;f<=102598;f++)e[f]=0;for(f=102601;f<=102603;f++)e[f]=0;for(f=102605;f<=102628;f++)e[f]=0;for(f=102629;f<=102646;f++)e[f]=2;for(f=102648;f<=102700;f++)e[f]=2;for(f=102701;f<=102703;f++)e[f]=0;for(f=102707;f<=102730;f++)e[f]=2;for(f=102733;f<=102758;f++)e[f]=2;for(f=102767;f<=102900;f++)e[f]=0;for(f=102965;f<=102969;f++)e[f]=0;for(f=102971;f<=102973;f++)e[f]=0;for(f=102975;f<=102989;f++)e[f]=0;for(f=102990;f<=102992;f++)e[f]=1;for(f=102997;f<=103002;f++)e[f]=0;for(f=103003;f<=103008;f++)e[f]=2;for(f=103009;f<=103011;f++)e[f]=0;for(f=103012;f<=103014;f++)e[f]=2;for(f=103019;f<=103021;f++)e[f]=0;for(f=103022;f<=103024;f++)e[f]=2;for(f=103029;f<=103031;f++)e[f]=0;for(f=103032;f<=103034;f++)e[f]=2;for(f=103065;f<=103068;f++)e[f]=0;for(f=103074;f<=103076;f++)e[f]=0;for(f=103077;f<=103079;f++)e[f]=1;for(f=103080;f<=103082;f++)e[f]=0;for(f=103083;f<=103085;f++)e[f]=2;for(f=103090;f<=103093;f++)e[f]=0;for(f=103097;f<=103099;f++)e[f]=0;for(f=103100;f<=103102;f++)e[f]=2;for(f=103107;f<=103109;f++)e[f]=0;for(f=103110;f<=103112;f++)e[f]=2;for(f=103113;f<=103116;f++)e[f]=0;for(f=103117;f<=103120;f++)e[f]=2;for(f=103153;f<=103157;f++)e[f]=0;for(f=103158;f<=103162;f++)e[f]=2;for(f=103163;f<=103165;f++)e[f]=0;for(f=103166;f<=103168;f++)e[f]=1;for(f=103169;f<=103171;f++)e[f]=2;for(f=103186;f<=103188;f++)e[f]=0;for(f=103189;f<=103191;f++)e[f]=2;for(f=103192;f<=103195;f++)e[f]=0;for(f=103196;f<=103199;f++)e[f]=2;for(f=103200;f<=103224;f++)e[f]=0;for(f=103225;f<=103227;f++)e[f]=1;for(f=103232;f<=103237;f++)e[f]=0;for(f=103238;f<=103243;f++)e[f]=2;for(f=103244;f<=103246;f++)e[f]=0;for(f=103247;f<=103249;f++)e[f]=2;for(f=103254;f<=103256;f++)e[f]=0;for(f=103257;f<=103259;f++)e[f]=2;for(f=103264;f<=103266;f++)e[f]=0;for(f=103267;f<=103269;f++)e[f]=2;for(f=103300;f<=103375;f++)e[f]=0;for(f=103381;f<=103383;f++)e[f]=0;for(f=103384;f<=103386;f++)e[f]=1;for(f=103387;f<=103389;f++)e[f]=0;for(f=103390;f<=103392;f++)e[f]=2;for(f=103397;f<=103399;f++)e[f]=0;for(f=103400;f<=103471;f++)e[f]=2;for(f=103476;f<=103478;f++)e[f]=0;for(f=103479;f<=103481;f++)e[f]=2;for(f=103486;f<=103488;f++)e[f]=0;for(f=103489;f<=103491;f++)e[f]=2;for(f=103492;f<=103495;f++)e[f]=0;for(f=103496;f<=103499;f++)e[f]=2;for(f=103528;f<=103543;f++)e[f]=0;for(f=103544;f<=103548;f++)e[f]=2;for(f=103549;f<=103551;f++)e[f]=0;for(f=103552;f<=103554;f++)e[f]=1;for(f=103555;f<=103557;f++)e[f]=2;for(f=103558;f<=103560;f++)e[f]=0;for(f=103571;f<=103573;f++)e[f]=0;for(f=103574;f<=103576;f++)e[f]=2;for(f=103577;f<=103580;f++)e[f]=0;for(f=103581;f<=103583;f++)e[f]=2;for(f=103595;f<=103598;f++)e[f]=0;for(f=103600;f<=103694;f++)e[f]=0;for(f=103696;f<=103699;f++)e[f]=0;for(f=103700;f<=103793;f++)e[f]=2;for(f=103794;f<=103871;f++)e[f]=0;for(f=103900;f<=103971;f++)e[f]=2;return r("extend-esri")&&(o.WKIDUnitConversion=e),e}));
