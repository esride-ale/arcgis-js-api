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

define({documentTypes:{data:{caption:"INSPIRE (Data)",description:""},service:{caption:"INSPIRE (Tjeneste)",description:""}},dataThemeKeywords:{caption:"Inspire-datatema"},inspireServiceType:{discovery:"Oppdagelsestjeneste",view:"Visningstjeneste",download:"Nedlastingstjeneste",transformation:"Forandringstjeneste",invoke:"Start tjeneste",other:"Annen tjeneste"},keywordSections:{dataTheme:"Inspire-datatema",serviceCategory:"ISO 19119 tjenestekategori",gemetConcept:"GEMET-konsept",otherKeywords:"Andre nøkkelord"},LanguageCode:{bul:"Bulgarsk",cze:"Tsjekkisk",dan:"Dansk",dut:"Nederlandsk",eng:"Engelsk",est:"Estisk",fin:"Finsk",fre:"Fransk",ger:"Tysk",gre:"Gresk",hun:"Ungarsk",gle:"Gælisk (irsk)",ita:"Italiensk",lav:"Latvisk",lit:"Litauisk",mlt:"Maltesisk",pol:"Polsk",por:"Portugisisk",rum:"Rumensk",slo:"Slovakisk",slv:"Slovensk",spa:"Spansk",swe:"Svensk",chi:"Kinesisk",kor:"Koreansk",nor:"Norsk",rus:"Russisk",tur:"Tyrkisk"},otherConstraints:{noLimitations:"Ingen begrensninger",confidentialityOfProceedings:"Konfidensialiteten som gjelder saksbehandlingen hos offentlige myndigheter ...",internationalRelations:"Internasjonale relasjoner, offentlig sikkerhet eller nasjonalt forsvar",courseOfJustice:"Rettens gang, alles rett til en rettferdig rettssak ...",confidentialityOfCommercial:"Konfidensialiteten til kommersiell eller industriell informasjon ...",intellectualProperty:"Immaterielle rettigheter",confidentialityOfPersonalData:"Konfidensialiteten til personopplysninger og/eller filer ...",interestsOrProtection:"Interessene til eller beskyttelsen av personer som leverte informasjonen ...",protectionOfEnvironment:"Beskyttelsen av miljøet som slik informasjon gjelder ...",freeText:"Fritekst"},serviceType:{humanInteractionService:"100 Geografiske menneskelige interaksjonstjenester",humanCatalogueViewer:"101 Katalogvisning",humanGeographicViewer:"102 Geografisk visning",humanGeographicSpreadsheetViewer:"103 Geografisk regnearkvisning",humanServiceEditor:"104 Tjenesteredigeringsverktøy",humanChainDefinitionEditor:"105 Kjededefinisjonsredigeringsverktøy",humanWorkflowEnactmentManager:"106 Iverksettingsadministrering av arbeidsflyt",humanGeographicFeatureEditor:"107 Geografisk geoobjektsredigeringsverktøy",humanGeographicSymbolEditor:"108 Geografisk symbolredigeringsverktøy ",humanFeatureGeneralizationEditor:"109 Geoobjektgeneraliseringsverktøy",humanGeographicDataStructureViewer:"110 Geografisk datastrukturvisning",infoManagementService:"200 Geografisk modell/informasjonshåndteringstjeneste",infoFeatureAccessService:"201 Geoobjektstilgangstjeneste",infoMapAccessService:"202 Karttilgangstjeneste",infoCoverageAccessService:"203 Dekningstilgangstjeneste",infoSensorDescriptionService:"204 Sensorbeskrivelsestjeneste",infoProductAccessService:"205 Produkttilgangstjeneste",infoFeatureTypeService:"206 Geoobjektstypetjeneste",infoCatalogueService:"207 Katalogtjeneste",infoRegistryService:"208 Registertjeneste",infoGazetteerService:"209 Navneregistertjeneste",infoOrderHandlingService:"210 Ordrehåndteringstjeneste",infoStandingOrderService:"211 Stående ordretjeneste",taskManagementService:"300 Geografisk arbeidsflyt/oppgavehåndteringstjenester",chainDefinitionService:"301 Kjededefinisjonstjeneste",workflowEnactmentService:"302 Arbeidsflytiverksettingstjeneste",subscriptionService:"303 Abonnementstjeneste",spatialProcessingService:"400 Geografiske behandlingstjenester - romlige",spatialCoordinateConversionService:"401 Koordinatkonverteringstjeneste",spatialCoordinateTransformationService:"402 Koordinatforandringstjeneste",spatialCoverageVectorConversionService:"403 Deknings-/vektorkonverteringstjeneste",spatialImageCoordinateConversionService:"404 Bildekoordinatkonverteringstjeneste",spatialRectificationService:"405 Utbedringstjeneste",spatialOrthorectificationService:"406 Ortorektifiseringstjeneste",spatialSensorGeometryModelAdjustmentService:"407 Justeringstjeneste for sensorgeometrimodell",spatialImageGeometryModelConversionService:"408 Bildegeometrimodellkonverteringstjeneste",spatialSubsettingService:"409 Undersett-tjeneste",spatialSamplingService:"410 Prøvetakingstjeneste",spatialTilingChangeService:"411 Flisleggingstjeneste",spatialDimensionMeasurementService:"412 Dimensjonsmåletjeneste",spatialFeatureManipulationService:"413 Geoobjektsmanipuleringstjenester",spatialFeatureMatchingService:"414 Geoobjektsamsvarstjeneste",spatialFeatureGeneralizationService:"415 Geoobjektgeneraliseringstjeneste",spatialRouteDeterminationService:"416 Rutefastsettingstjeneste",spatialPositioningService:"417 Posisjoneringstjeneste",spatialProximityAnalysisService:"418 Nærhetsanalyse",thematicProcessingService:"500 Geografiske behandlingstjenester - tematiske",thematicGoparameterCalculationService:"501 Geoparameterberegningstjeneste",thematicClassificationService:"502 Tematisk klassifiseringstjeneste",thematicFeatureGeneralizationService:"503 Geoobjektgeneraliseringstjeneste",thematicSubsettingService:"504 Undersett-tjeneste",thematicSpatialCountingService:"505 Geografisk telletjeneste",thematicChangeDetectionService:"506 Endringsoppdagelsestjeneste",thematicGeographicInformationExtractionService:"507 Informasjonsinnhentingstjenester for geografisk informasjon",thematicImageProcessingService:"508 Bildebehandlingstjeneste",thematicReducedResolutionGenerationService:"509 Tjeneste for redusert oppløsningsgenerering",thematicImageManipulationService:"510 Bildemanipuleringstjenester",thematicImageUnderstandingService:"511 Bildeforståelsestjenester",thematicImageSynthesisService:"512 Bildesyntesetjenester",thematicMultibandImageManipulationService:"513 Flerbånds bildemanipulering",thematicObjectDetectionService:"514 Objektoppdagelsestjeneste",thematicGeoparsingService:"515 Geobehandlingstjeneste",thematicGeocodingService:"516 Geokodingtjeneste",temporalProcessingService:"600 Geografiske behandlingstjenester - tidsbestemte",temporalReferenceSystemTransformationService:"601 Forandringstjeneste for tidsbestemt referansesystem",temporalSubsettingService:"602 Undersett-tjeneste",temporalSamplingService:"603 Prøvetakingstjeneste",temporalProximityAnalysisService:"604 Tidsbestemt nærhetsanalysetjeneste",metadataProcessingService:"700 Geografiske behandlingstjenester - metadata",metadataStatisticalCalculationService:"701 Statistisk beregningstjeneste",metadataGeographicAnnotationService:"702 Geografiske merknadstjenester",comService:"800 Geografiske kommunikasjonstjenester",comEncodingService:"801 Kodetjeneste",comTransferService:"802 Overføringstjeneste",comGeographicCompressionService:"803 Geografisk komprimeringstjeneste",comGeographicFormatConversionService:"804 Geografisk formatkonverteringstjeneste",comMessagingService:"805 Meldingstjeneste",comRemoteFileAndExecutableManagement:"806 Ekstern håndtering av filer og kjørbare filer"},useLimitation:{noCondition:"Ingen vilkår gjelder",unknownCondition:"Ukjent betingelse",freeText:"Fritekst"}});
