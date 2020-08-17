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

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"لا شيء",notComplete:"غير مكتمل",other:"آخر",present:"موجود",unknown:"غير معروف",unpublishedMaterial:"مواد غير منشورة"},hints:{integerGreaterThanOne:"(أدخل عدد صحيح > 1)",integer0To100:"(أدخل عدد صحيح 0..100)"},citeinfo:{caption:"معلومات الاقتباس",origin:"المنشئ",pubdate:"تاريخ النشر",pubtime:"وقت النشر",title:"العنوان",edition:"إصدار",geoform:{caption:"نموذج تقديم البيانات الجغرافية المكانية",atlas:"أطلس",audio:"الصوت",diagram:"رسم تخطيطي",sDocument:"مستند",globe:"العالم",map:"خريطة",model:"النمط",multiMediaPresentation:"عرض تقديمي متعدد الوسائط",profile:"ملف تعريفي",rasterDigitalData:"بيانات رقمية نقطية",remoteSensingImage:"صور الاستشعار عن بعد",section:"قسم",spreadsheet:"جدول البيانات",tabularDigitalData:"بيانات رقمية جدولية",vectorDigitalData:"بيانات رقمية خطية",video:"مقاطع الفيديو",view:"عرض"},serinfo:{caption:"معلومات التسلسل",sername:"اسم السلسلة",issue:"تعريف المشكلة"},pubinfo:{caption:"معلومات المنشور",pubplace:"موضع المنشور",publish:"الناشر"},othercit:"تفاصيل اقتباس آخر",onlink:"رابط متصل (عنوان URL)"},cntinfo:{caption:"معلومات الاتصال",section:{primary:"أساسي",phoneAndEmail:"الهاتف والبريد الإلكتروني",hoursAndInstructions:"ساعات وتعليمات"},cntorgp:{caption:"بالمؤسسة",cntorg:"مؤسسة",cntper:"شخص"},cntperp:{caption:"بالشخص",cntper:"شخص",cntorg:"مؤسسة"},cntpos:"الموضع",cntaddr:{caption:"العنوان",addrtype:{caption:"نوع العنوان",mailing:"‏‏مراسلة بريدية",physical:"فعلي",mailingAndPhysical:"‏‏مراسلة بريدية وفعلية"},address:"العنوان",city:"مدينة",state:"ولاية",postal:"الرمز البريدي",country:"دولة"},cntvoice:"صوت",cnttdd:"هاتف TDD/TTY (ضعاف السمع)",cntfax:"الفاكس",cntemail:"عنوان البريد الإلكتروني",hours:"ساعات",cntinst:"تعليمات"},dataqual:{caption:"معلومات جودة البيانات",section:{attributeAccuracy:"دقة البيان",logicalConsistency:"تتطابق منطقي",completeness:"اكتمال",positionalAccuracy:"دقة موضعية",lineage:"فرع",cloudCover:"الغطاء السحابي"},attracc:{caption:"دقة البيان",attraccr:"تقرير دقة البيان",qattracc:{caption:"تقييم دقة البيان الكمية",attraccv:"قيمة دقة البيان",attracce:"تفسير دقة البيان"}},logic:"تقرير التناسق المنطقي",complete:"تقرير الإتمام",posacc:"دقة موضعية",horizpa:{caption:"الدقة الموضعية الأفقية",horizpar:"تقرير الدقة الموضعية الأفقية",qhorizpa:{caption:"تقييم الدقة الموضعية الأفقية الكمية",horizpav:"قيمة دقة موضعية أفقية",horizpae:"تفسير الدقة الموضعية الأفقية"}},vertacc:{caption:"الدقة الموضعية الرأسية",vertaccr:"تقرير الدقة الموضعية الرأسية",qvertpa:{caption:"قياس الدقة الموضعية الأفقية الكمية",vertaccv:"قيمة الدقة الموضعية الرأسية",vertacce:"تفسير الدقة الموضعية الرأسية"}},lineage:{caption:"فرع"},srcinfo:{caption:"معلومات المصدر",srccite:"اقتباس المصدر",srcscale:"مقام مقياس رسم المصدر",typesrc:{caption:"نوع وسيط المصدر",paper:"ورقة",stableBaseMaterial:"مواد مستقرة",microfiche:"شريحة الصور المصغرة",microfilm:"ميكروفيلم",audiocassette:"شرائط سمعية",chart:"الرسم البياني",filmstrip:"قطاع سينمائي",transparency:"الشفافية",videocassette:"شرائط فيديو",videodisc:"أقراص الفيديو",videotape:"شرائط الفيديو",physicalModel:"نموذج فعلي",computerProgram:"برنامج الكمبيوتر",disc:"ديسك",cartridgeTape:"شريط كارتريج",magneticTape:"شريط مغناطيسي",online:"متصل",cdrom:"محرك أقراص مدمجة",electronicBulletinBoard:"لوحة نشرات إلكترونية",electronicMailSystem:"نظام بريد إلكتروني"},srctime:"فترة وقت المصدر للمحتوى",srccurr:"المرجع الحالي للمصدر",srccitea:"اختصار اقتباس المصدر",srccontr:"المساهمة المصدر"},procstep:{caption:"خطوة عملية",procdesc:"وصف العملية",srcused:"استخدام المصدر لاختصار الاقتباس",procdate:"تاريخ العملية",proctime:"وقت العملية",srcprod:"اختصار اقتباس منتج من المصدر",proccont:"اتصال العملية"},cloud:"الغطاء السحابي"},distinfo:{caption:"معلومات التوزيع",section:{distributor:"موزع",description:"الوصف",orderProcess:"عملية الترتيب",prerequisites:"المتطلبات الأساسية",availability:"التوفر"},distrib:"موزع",resdesc:{caption:"وصف المورد",liveData:"خرائط وبيانات مباشرة",downloadableData:"بيانات قابلة للتنزيل",offlineData:"البيانات غير المتصلة بشبكة الإنترنت",staticMapImages:"صور خريطة ثابتة",sDocument:"وثائق أخرى",application:"تطبيقات",geographicService:"الخدمات الجغرافية",clearingHouse:"دور المقاصة",mapFiles:"ملفات الخريطة",geographicActivies:"الأنشطة الجغرافية"},distliab:"توزيع احتمالي طبيعي",custom:"عملية ترتيب مخصصة",techpreq:"المتطلبات الأساسية التقنية",availabl:"التوفر"},eainfo:{caption:"معلومات حول الوحدة والبيان",overview:"وصف المعاينة",eaover:"نظرة عامة حول الوحدة والبيانات الجدولية",eadetcit:"اقتباس تفاصيل الكيان والبيان"},idinfo:{caption:"معلومات الهوية",section:{timeAndStatus:"الوقت والحالة",constraints:"القيود",contact:"اتصال",additional:"تتوافر خطوات إضافية لـ موارد مطور"},citeinfo:"اقتباس",descript:{caption:"الوصف",sAbstract:"الخلاصة",purpose:"الغرض",supplinf:"معلومات تكميلية"},timeperd:{caption:"فترة الوقت للمحتوى",current:{caption:"المرجع الحالي",groundCondition:"شرط أساسي",publicationDate:"تاريخ النشر"}},status:{caption:"الحالة",progress:{caption:"تقدم",complete:"اكتمل",inWork:"قيد التشغيل",planned:"مخطَط"},update:{caption:"تكرار الصيانة والتحديث",continual:"مستمر",daily:"يوميًا",weekly:"أسبوعيًا",monthly:"شهريًا",annually:"سنويًا",unknown:"غير معروف",asNeeded:"حسب الطلب",irregular:"غير منتظم",nonePlanned:"غير مخطط"}},spdom:{caption:"المدى",bounding:{caption:"إحداثيات حدود",westbc:"خط طول الإحاطة الغربي",eastbc:"خط طول الإحاطة الشرقي",northbc:"دائرة عرض الإحاطة الشمالية",southbc:"دائرة عرض الإحاطة الجنوبية"}},keywords:{caption:"الكلمات الأساسية",theme:"سمة",place:"وضع",stratum:"الطبقة",temporal:"زماني",thesaursus:"المترادفات المقترنة",delimited:"الكلمات الأساسية",themektIsoTopicCategory:"موضوع ISO...",themektIsoTopicDialog:"موضوع ISO",placektGnis:"نظام معلومات الأسماء الجغرافي"},accconst:"قيود الوصول",useconst:"استخدام القيود",ptcontac:"نقطة اتصال المورد",browse:{caption:"استعراض رسم بياني",browsen:"استعراض عنوان URL البياني",browsed:"استعراض وصف ملف الرسومات",browset:"استعراض نوع ملف الجرافيك"},datacred:"مشرف مجموعة البيانات",secinfo:{caption:"معلومات الأمان",secsys:"نظام تصنيف الأمان",secclass:{caption:"تصنيف الأمان",topSecret:"سري للغاية",secret:"سر",confidential:"سري",restricted:"مقيدة",unclassified:"غير مصنف",sensitive:"حساس"},sechandl:"وصف التمعامل مع الحماية"},sNative:"بيئة مجموعة البيانات الأصلية",crossref:"إسناد ترافقي"},metadata:{idinfo:"تعريف",dataqual:"الجودة",spdoinfo:"تنظيم بيانات مكانية",spref:"المرجع المكاني",eainfo:"الهوية والبيانات الجدولية",distinfo:"التوزيع",metainfo:"الوصفية"},metainfo:{caption:"معلومات بيانات التعريف",section:{dates:"تواريخ البيانات التعريفية",contact:"جهات اتصال بيانات التعريف",standard:"البيانات التعريفية القياسية",additional:"تتوافر خطوات إضافية لـ موارد مطور"},metd:"تاريخ البيانات التعريفية",metrd:"تاريخ مراجعة البيانات التعريفية",metfrd:"تاريخ مراجعة البيانات التعريفية المستقبلية",metstdn:"اسم معيار بيانات التعريف",metstdv:"إصدار قياسي للبيانات التعريفية",metac:"قيود الوصول إلى البيانات التعريفية",metuc:"قيود استخدام بيانات التعريف",metsi:{caption:"معلومات أمان البيانات التعريفية",metscs:"نظام تصنيف أمان البيانات التعريفية",metsc:"تصنيف أمان البيانات التعريفية",metshd:"وصف التمعامل مع حماية بيانات التعريف"}},spref:{caption:"معلومات الإسناد المكاني",horizsys:{caption:"نظام إحداثي أفقي",geograph:{caption:"جغرافي",latres:"دقة خط العرض",longres:"دقة خط الطول",geogunit:{caption:"وحدات الإحداثيات الجغرافية",decimalDegrees:"الدرجات العشرية",decimalMinutes:"دقائق عشرية",decimalSeconds:"ثوان عشرية",degreesAndDecimalMinutes:"درجات ودقائق عشرية",degreesMinutesAndDecimalSeconds:"درجات ودقائق وثوان عشرية",radians:"التقديرات الدائرية",grads:"درجات"}},planar:{caption:"مسطح"},local:{caption:"محلي",localdes:"الوصف المحلي",localgeo:"معلومات المرجع الجغرافي المحلي"},geodetic:{caption:"نموذج جوديسي",horizdn:{caption:"اسم مرجع إسناد أفقي",nad83:"سطح أنساب أمريكا الشمالية 1983",nad27:"سطح أنساب أمريكا الشمالية 1927"},ellips:{caption:"اسم المجسم الناقص",grs80:"نظام الإسناد الجيوديسي 80",clarke1866:"كلارك 1866"},semiaxis:"محور شبه أساسي",denflat:"مقام معدل التسطيح"}},vertdef:{caption:"النظام الإحداثي الرأسي",altsys:{caption:"نظام دائرة العرض",altdatum:{caption:"اسم مرجع إسناد الارتفاع",navd88:"مرجع إسناد أمريكا الشمالية الأفقي 1988",ngvd29:"سطح الأنساب الجيوديسي الرأسي الوطني 1929"},altres:"دقة الارتفاع",altunits:{caption:"وحدات مسافة الارتفاع",meters:"متر",feet:"قدم"},altenc:{caption:"طريقة ترميز البيان",explicit:"إحداثيات الارتفاع الواضحة المُضمنة في الإحداثيات الأفقية",implicit:"إحداثيات ضمنية",attribute:"قيم البيانات الجدولية"}},depthsys:{caption:"نظام العمق",depthdn:{caption:"اسم مرجع إسناد العمق",option1:"السطح المحلي",option2:"مرجع إسناد المخطط، مخطط خفض الصوت",option3:"أقل مدّ فلكي",option4:"أعلى مدّ فلكي",option5:"متوسط انخفاض منسوب الماء",option6:"متوسط ارتفاع منسوب الماء",option7:"متوسط مستوى البحر",option8:"مرجع إسناد مسح الأرض",option9:"متوسط انخفاض الجزر الربيعي",option10:"متوسط ارتفاع الجزر الربيعي",option11:"متوسط المد الناقص لانخفاض منسوب الماء",option12:"متوسط المد الناقص لارتفاع منسوب الماء",option13:"متوسط انخفاض أكبر لمنسوب الماء",option14:"متوسط انخفاض أكبر للجزر الربيعي",option15:"متوسط ارتفاع أكبر لافتراع منسوب الماء",option16:"متوسط ارتفاع أكبر لمنسوب الماء",option17:"متوسط انخفاض أكبر لارتفاع منسوب الماء",option18:"المدّ الربيعي",option19:"انخفاض مداري أكبر لانخفاض منسوب الماء",option20:"مدّ ناقص",option21:"ارتفاع منسوب الماء",option22:"ارتفاع أكبر لارتفاع منسوب الماء",option23:"انخفاض منسوب الماء",option24:"مرجع إسناد انخفاض منسوب الماء",option25:"أقل مستوى لانخفاض منسوب الماء",option26:"انخفاض أكبر لانخفاض منسوب الماء",option27:"أكبر انخفاض للانخفاض العادي لمنسوب الماء",option28:"متوسط مستوى المدّ",option29:"متوسط الجزء الربيعي الهندي",option30:"أكبر ارتفاع لمنسوب الماء",option31:"أكبر انخفاض لمنسوب الماء",option32:"مرجع إسناد نهر كولومبيا",option33:"مرجع إسناد انخفاض منسوب ماء ساحل الخليج",option34:"انخفاض منسوب الجزر الربيعي الاستوائي",option35:"أقل مدّ فلكي تقريبي",option36:"لا يوجد تصحيح"},depthres:"دقة العمق",depthdu:{caption:"وحدات مسافة العمق",meters:"متر",feet:"قدم"},depthem:{caption:"طريقة ترميز العمق",explicit:"إحداثيات العمق الواضحة المُضمنة في الإحداثيات الأفقية",implicit:"إحداثيات ضمنية",attribute:"قيم البيانات الجدولية"}}}},timeinfo:{caption:"معلومات فترة الوقت",sngdate:"تاريخ مفرد",mdattim:"تواريخ متعددة",rngdates:"نطاق البيانات",caldate:"التاريخ",time:"الوقت",begdate:"تاريخ البدء",begtime:"وقت البدء",enddate:"تاريخ الانتهاء",endtime:"وقت الانتهاء"}});
