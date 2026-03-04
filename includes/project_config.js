function getProjectId(environment) {
    const cleanEnv = String(environment).replace(/['"]/g, '').trim();
    const projects = {
        dev: "speedy-cargo-379606",
        prod: "us-pricingtool-prod"
    };
    return projects[cleanEnv] || projects.dev;
}

function getSourceSchema(source) {
    const schemas = {
        salesforce: "pds__salesforce__all",
        dcm: "pds__dcm__all",
        sizemek: "pds__sizemek__all",
        xandr: "pds__xandr__all",
        dv360: "pds__dv360__all",
        amazon: "pds__amazon__all",
        ttd: "pds__ttd__all",
        yahoo: "pds__yahoo__all",
        quantcast: "pds__quantcast__all",
        doubleverify: "pds__doubleverify__all",
        ias: "pds__ias__all",
        viant: "pds__viant__all",
        zeta: "pds__zeta__all"
    };
    return schemas[source];
}

function getSourceTable(source) {
    const tables = {
        salesforce: "p_nexus_api_salesforce",
        dcm: "p_nexus_api_dcm",
        sizemek: "p_nexus_api_sizmek",
        xandr: "p_nexus_api_xandr",
        dv360_standard: "p_nexus_api_dv360_standard",
        dv360_youtube: "p_nexus_api_dv360_youtube",
        amazon: "p_nexus_api_amazon",
        ttd: "p_nexus_api_ttd_standard",
        yahoo: "p_nexus_api_yahoo",
        quantcast: "p_nexus_api_quantcast",
        doubleverify: "p_nexus_api_doubleverify",
        ias: "p_nexus_api_ias",
        viant: "p_nexus_api_viant",
        zeta: "p_nexus_api_zeta"
    };
    return tables[source];
}

function getTargetSchema(layer) {
    const targets = {
        pds: "pds",
        int: "ini",
        eds: "eds__advertisers__all"
    };

    const result = targets[layer];
    if (result && result.includes('.')) {
        console.warn(`Warning: getTargetSchema('${layer}') returned '${result}' which contains dots. Cleaning...`);
        return result.replace(/\./g, '_'); // 
    }

    return result;
}

function getFullSourcePath(source, environment) {
    const cleanEnv = String(environment).replace(/['"]/g, '').trim();
    const projectId = getProjectId(cleanEnv);
    const schema = getSourceSchema(source);
    const table = getSourceTable(source);
    return `${projectId}.${schema}.${table}`;
}

function getFullTargetPath(layer, tableName, environment) {
    const cleanEnv = String(environment).replace(/['"]/g, '').trim();
    const projectId = getProjectId(cleanEnv);
    const schema = getTargetSchema(layer);
    return `${projectId}.${schema}.${tableName}`;
}

module.exports = {
    getProjectId,
    getSourceSchema,
    getSourceTable,
    getTargetSchema,
    getFullSourcePath,
    getFullTargetPath
};
