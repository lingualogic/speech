/** @packageDocumentation
 * ServiceManager for manage all Services
 *
 * Last Change: 19.10.2020
 * Status: red
 *
 * @module service
 * @author SB
 */


// service

import {
    SERVICE_ACTION_NAME,
    SERVICE_BOT_NAME,
    SERVICE_INTENT_NAME,
    SERVICE_LISTEN_NAME,
    SERVICE_SPEAK_NAME
} from './service-const';
import { ServiceList } from './service-list';


/**
 * static ServiceManager Class for create Services
 *
 * @export
 * @class ServiceManager
 */

export class ServiceManager {

    /**
     * List of Speech-Angular Service Singletons
     */

    private static mServiceList = new ServiceList();

    /**
     * ServiceManager clear
     */

    static clear(): number {
        return ServiceManager.mServiceList.clear();
    }

    /**
     * write Speak Options in Config
     *
     * @param aServiceOption - to set options
     */

    private static _setSpeakConfig( aServiceOption: any, aServiceClass: any): number {
        try {
            const speakConfig = aServiceClass.getConfig();
            if ( typeof aServiceOption.activeFlag === 'boolean' ) {
                speakConfig.activeFlag = aServiceOption.activeFlag;
            }
            if ( typeof aServiceOption.speakLanguage === 'string' ) {
                speakConfig.speakLanguage = aServiceOption.speakLanguage;
            }
            if ( typeof aServiceOption.audioFormat === 'string' ) {
                speakConfig.audioFormat = aServiceOption.audioFormat;
            }
            if ( typeof aServiceOption.audioFilePath === 'string' ) {
                speakConfig.audioFilePath = aServiceOption.audioFilePath;
            }
            if ( typeof aServiceOption.audioFlag === 'boolean' ) {
                speakConfig.audioFlag = aServiceOption.audioFlag;
            }
            if ( typeof aServiceOption.errorOutputFlag === 'boolean' ) {
                speakConfig.errorOutputFlag = aServiceOption.errorOutputFlag;
            }
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

    /**
     * write Listen Options to Config
     *
     * @param aServiceOption - to set options
     */

    private static _setListenConfig( aServiceOption: any, aServiceClass: any ): number {
        try {
            const listenConfig = aServiceClass.getConfig();
            if ( typeof aServiceOption.activeFlag === 'boolean' ) {
                listenConfig.activeFlag = aServiceOption.activeFlag;
            }
            if ( typeof aServiceOption.listenLanguage === 'string' ) {
                listenConfig.listenLanguage = aServiceOption.listenLanguage;
            }
            if ( typeof aServiceOption.errorOutputFlag === 'boolean' ) {
                listenConfig.errorOutputFlag = aServiceOption.errorOutputFlag;
            }
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

    /**
     * write Intent Options to Config
     *
     * @param aServiceOption - to set options
     */

    private static _setIntentConfig( aServiceOption: any, aServiceClass: any ): number {
        try {
            const intentConfig = aServiceClass.getConfig();
            if ( typeof aServiceOption.activeFlag === 'boolean' ) {
                intentConfig.activeFlag = aServiceOption.activeFlag;
            }
            if ( typeof aServiceOption.intentLanguage === 'string' ) {
                intentConfig.intentLanguage = aServiceOption.intentLanguage;
            }
            if ( typeof aServiceOption.errorOutputFlag === 'boolean' ) {
                intentConfig.errorOutputFlag = aServiceOption.errorOutputFlag;
            }
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

    /**
     * write Action Options to config
     *
     * @param aServiceOption - to set options
     */

    private static _setActionConfig( aServiceOption: any, aServiceClass: any ): number {
        try {
            const actionConfig = aServiceClass.getConfig();
            if ( typeof aServiceOption.activeFlag === 'boolean' ) {
                actionConfig.activeFlag = aServiceOption.activeFlag;
            }
            if ( typeof aServiceOption.errorOutputFlag === 'boolean' ) {
                actionConfig.errorOutputFlag = aServiceOption.errorOutputFlag;
            }
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

    /**
     * write Bot Options to config
     *
     * @param aServiceOption - to set options
     */

    private static _setBotConfig( aServiceOption: any, aServiceClass: any ): number {
        // console.log('ServiceManager.setBotConfig: option = ', aServiceOption);
        try {
            const botConfig = aServiceClass.getConfig();
            if ( typeof aServiceOption.activeFlag === 'boolean' ) {
                botConfig.activeFlag = aServiceOption.activeFlag;
            }
            if ( typeof aServiceOption.speakFlag === 'boolean' ) {
                botConfig.speakFlag = aServiceOption.speakFlag;
            }
            if ( typeof aServiceOption.actionFlag === 'boolean' ) {
                botConfig.actionFlag = aServiceOption.actionFlag;
            }
            if ( typeof aServiceOption.dialogName === 'string' ) {
                botConfig.dialogName = aServiceOption.dialogName;
            }
            if ( typeof aServiceOption.dialogRootState === 'string' ) {
                botConfig.dialogRootState = aServiceOption.dialogRootState;
            }
            if ( typeof aServiceOption.dialogLoadFlag === 'boolean' ) {
                botConfig.dialogLoadFlag = aServiceOption.dialogLoadFlag;
            }
            if ( typeof aServiceOption.dialogFilePath === 'string' ) {
                botConfig.dialogFilePath = aServiceOption.dialogFilePath;
            }
            if ( typeof aServiceOption.dialogFileName === 'string' ) {
                botConfig.dialogFileName = aServiceOption.dialogFileName;
            }
            if ( typeof aServiceOption.errorOutputFlag === 'boolean' ) {
                botConfig.errorOutputFlag = aServiceOption.errorOutputFlag;
            }
            // console.log('ServiceManager.setBotConfig: config = ', botConfig);
            return 0;
        } catch ( aException ) {
            return -1;
        }
    }

    /**
     * Service create and initalize
     *
     * @param aServiceName - Name of Speech-Service
     * @param aServiceOption - Options for Speech-Service
     */

    private static _setConfig( aServiceName: string, aServiceOption: any, aServiceClass: any ): void {
        try {
            // Service zum Namen erzeugen
            switch ( aServiceName ) {
                case SERVICE_SPEAK_NAME:
                    ServiceManager._setSpeakConfig( aServiceOption, aServiceClass );
                    break;
                case SERVICE_LISTEN_NAME:
                    ServiceManager._setListenConfig( aServiceOption, aServiceClass );
                    break;
                case SERVICE_INTENT_NAME:
                    ServiceManager._setIntentConfig( aServiceOption, aServiceClass );
                    break;
                case SERVICE_ACTION_NAME:
                    ServiceManager._setActionConfig( aServiceOption, aServiceClass );
                    break;
                case SERVICE_BOT_NAME:
                    ServiceManager._setBotConfig( aServiceOption, aServiceClass );
                    break;
                default:
                    break;
            }
        } catch ( aException ) {
            // tslint:disable-next-line: no-console
            console.log( 'ServiceManager._add: Exception ', aException );
        }
    }


    /**
     * get Service
     *
     * @param aServiceName - Name des Services
     * @param aServiceClass - Klasse des Service
     * @param [aServiceOption] - Optionen des Services
     * @return get Service or null
     */

    static get( aServiceName: string, aServiceClass: any, aServiceOption = {}): any {
        // console.log('ServiceManager.get: ', aServiceName, aServiceClass);
        if ( !aServiceName ) {
            console.log( 'ServiceManager.get: kein Servicename uebergeben' );
            return null;
        }
        let service = ServiceManager.mServiceList.find( aServiceName );
        if ( service ) {
            // console.log( 'ServiceManager.get: Service gefunden', aServiceName, service );
            return service;
        }
        if ( !aServiceClass ) {
            console.log( 'ServiceManager.get: keine Serviceklasse uebergeben' );
            return null;
        }
        try {
            // console.log('ServiceManager.get: Service neu erzeugt');
            ServiceManager._setConfig( aServiceName, aServiceOption, aServiceClass );
            service = new aServiceClass();
            // console.log('ServiceManager.get: Service neu erzeugt', service, service.getName());
        } catch ( aException ) {
            console.log( 'ServiceManager.get: Exception ', aException );
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('BuilderManager.get: same name? ', aBuilderName, builder.getName());
        if ( aServiceName !== service.getName()) {
            console.log( 'ServiceManager.get: Servicenamen stimmen nicht ueberein ' + aServiceName + ' != ' + service.getName());
            // TODO: ServiceManager.remove( service.getName());
            return null;
        }
        // TODO: wird im Construktor erledigt
        // einfuegen in ServiceListe
        // ServiceManager.mServiceList.insert( aServiceName, service );
        return service;
    }


    /**
     * Service zurueckgeben
     *
     * @param aServiceName - Name des Services
     *
     * @return Service oder null
     */

    static find( aServiceName: string ): any {
        // console.log('ServiceManager.get: ', aServiceName, aServiceClass);
        if ( !aServiceName ) {
            console.log( 'ServiceManager.get: kein Servicename uebergeben' );
            return null;
        }
        return ServiceManager.mServiceList.find( aServiceName );
    }


    /**
     * insert Service
     *
     * @param aServiceName - Name des Services
     * @param aService - einzutragender Service
     * @return 0 oder -1
     */

    static insert( aService: any ): number {
        if ( !aService ) {
            console.log( 'ServiceManager.insert: kein Service uebergeben' );
            return -1;
        }
        if ( ServiceManager.mServiceList.find( aService.getName())) {
            return -1;
        }
        return ServiceManager.mServiceList.insert( aService.getName(), aService );
    }

    // static Class, no Instance

    private constructor() {}

}
