import packageData from '../../package.json'

interface SandboxData {
    env01: boolean;
    env02: boolean;
    env03: boolean;
    env04: boolean;
    env05: boolean;
    BDLQ_LOCAL: string | null;
    sandboxName: string | null;
}

const getSandboxData = (): Promise<SandboxData> => {
    return new Promise((resolve) => {
        const fullURL = window.location.href;
        const urlParts = fullURL.split('/');

        const env01 = urlParts.some(part => part.toUpperCase().includes(packageData.env.env01));
        const env02 = urlParts.some(part => part.toUpperCase().includes(packageData.env.env02));
        const env03 = urlParts.some(part => part.toUpperCase().includes(packageData.env.env03));
        const env04 = urlParts.some(part => part.toUpperCase().includes(packageData.env.env04));
        const env05 = urlParts.some(part => part.toUpperCase().includes(packageData.env.env05));

        const matchBDLQ = urlParts.find(part => /BDLQ-\d{3}/i.test(part));
        const BDLQ_LOCAL = matchBDLQ ? `BDLQ_${matchBDLQ.match(/\d{3}/)![0]}` : null;
        const sandboxName = matchBDLQ ? `bdlq-${matchBDLQ.match(/\d{3}/)![0]}` : null;

        resolve({ env01, env02, env03, env04, env05, BDLQ_LOCAL, sandboxName });
    });
};

const getEnvURL = (env01: boolean, env02: boolean, env03: boolean, env04: boolean, env05: boolean): string | null => {
    return env01
    ? packageData.sites.urlSite01
    : env02
    ? packageData.sites.urlSite02
    : env03
    ? packageData.sites.urlSite03
    : env04
    ? packageData.sites.urlSite04
    : env05
    ? packageData.sites.urlSite05
    : null;
};

getSandboxData().then(({ env01, env02, env03, env04, env05, BDLQ_LOCAL, sandboxName }) => {
    const envURL = getEnvURL(env01, env02, env03, env04, env05);
    const BDLREALM = envURL !== null && envURL.includes('othersite') ? packageData.realm.BKDP : packageData.realm.BDLQ;
    const replacedImages = new WeakSet<HTMLImageElement>();
    //Here you need to update your images path
    const urls = {
        DEVurlImagesShare: `https://${envURL}/on/demandware.static/-/`,
        urlImagesShare: `https://${sandboxName}.dx.commercecloud.salesforce.com/on/demandware.static/-/`,
        DEVurlImagesShareTA: `https://${envURL}/on/demandware.static/Sites/-/`,
        urlImagesShareTA: `https://${sandboxName}.dx.commercecloud.salesforce.com/on/demandware.static/Sites-e/-/`,
        DEVurlImagesCatalog: `https://${envURL}/dw/image/v2/${BDLREALM}/on/demandware.static/-/`,
        urlImagesCatalog: `https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/${BDLQ_LOCAL}/on/demandware.static/-/`,
    };

    interface ImageLoad {
        src: string;
    }

    const replaceDataURL = (loadImagesLoad: ImageLoad[]): void => {
        loadImagesLoad.forEach(image => {
            const dataImages = document.querySelectorAll(`img[src="${image.src}"]`);
            const arrayDataImages = Array.from(dataImages) as HTMLImageElement[];

            arrayDataImages.forEach((dataImage: HTMLImageElement) => {
                dataImage.src = image.src
                .replace(urls.urlImagesCatalog, urls.DEVurlImagesCatalog)
                .replace(urls.urlImagesShare, urls.DEVurlImagesShare)
                .replace(urls.urlImagesShareTA, urls.DEVurlImagesShareTA);
            });
        });
    };

    const checkNewImages = (): void => {
        const currentImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
        const newImages: HTMLImageElement[] = Array.from(currentImages).filter((img: HTMLImageElement) => !replacedImages.has(img));

        if (newImages.length > 0) {
            const newImagesUrls: ImageLoad[] = newImages.map(img => ({ src: img.src }));
            replaceDataURL(newImagesUrls);
            newImages.forEach(img => replacedImages.add(img));
        }
    };

    window.onload = () => {
        const observer = new MutationObserver(mutationsList => {
            checkNewImages();
        });

        observer.observe(document.body, { subtree: true, childList: true });
        checkNewImages();
    };
});