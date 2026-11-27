// Fact ids from research/facts.json (verified 2026-11-23).
// Only publish and flag ids exist here, so a hold id fails `pnpm typecheck`.
// Every visible claim on the site carries one or more of these ids in the
// `facts` array of the content object that holds it. The arrays are never
// rendered and never sent to the browser (spec 7.5).
type Publish = readonly ["F001","F002","F003","F004","F005","F010","F011","F012","F013","F016","F017","F031","F032","F033","F034","F035","F036","F037","F038","F046","F060","F061","F062","F065","F066","F067","F068","F069","F070","F071","F072","F091","F100","F101","F102","F110","F111","F112","F113","F115","F116","F117","F118","F121","F122","F124","F129","F140","F141","F142","F143","F144","F150","F151","F152","F153","F154","F155","F156","F157","F158","F159","F170","F171","F181","F182","F190","F191","F192","F193","F194","F195","F196","F197"];
type Flag = readonly ["F014","F015","F030","F039","F040","F041","F045","F050","F051","F052","F063","F064","F080","F082","F103","F119","F120","F128","F161","F172","F173","F175","F180","F198","F199","F201","F210","F211","F212","F213","F214","F222","F223"];
export type FactId = Publish[number] | Flag[number];
