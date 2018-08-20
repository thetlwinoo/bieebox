export class BoxUtils {
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString(mainArr, searchText): any {
        if (searchText === '') {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj, searchText): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            const value = itemObj[prop];

            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr, searchText): boolean {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value, searchText): any {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string {
        function S4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    public static toggleInArray(item, array): void {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
        else {
            array.splice(array.indexOf(item), 1);
        }
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize(text): string {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    public static getDate = function (date, objDate) {
        // Create object whoose properties are feed values
        const day = date.getUTCDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        objDate.year = (year.toString().length === 1 ? '0' : '') + year;
        objDate.month = (month.toString().length === 1 ? '0' : '') + month;
        objDate.day = (day.toString().length === 1 ? '0' : '') + day;
        objDate.hours = (hours.toString().length === 1 ? '0' : '') + hours;
        objDate.minutes = (minutes.toString().length === 1 ? '0' : '') + minutes;
        objDate.seconds = (seconds.toString().length === 1 ? '0' : '') + seconds;
    }

    public static getVideoEmbed(tube, videoidVal) {
        // <!--template: '<div class='video'><iframe src='{{url}}' frameborder='0'
        // webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',-->
        let embedUrl = '';
        if ((tube === 'category') || (tube === 'music') || (tube === 'web')) {
            embedUrl = videoidVal;
        } else if ((tube === 'yt_channel') || (tube === 'channel_youtube')) {
            embedUrl = 'http://www.youtube.com/embed?listType=search&amp;list=' + videoidVal + '&format=5';
        } else if ((tube === 'youtube') || (tube === 'embed_youtube')) {
            embedUrl = 'http://www.youtube.com/embed/' + videoidVal;
        } else if ((tube === 'youku') || (tube === 'embed_youku')) {
            embedUrl = 'http://player.youku.com/embed/' + videoidVal;
        } else if ((tube === 'vimeo') || (tube === 'embed_vimeo')) {
            embedUrl = 'http://player.vimeo.com/video/' + videoidVal;
        } else if ((tube === 'ustreamtv') || (tube === 'embed_ustreamtv')) {
            embedUrl = 'http://www.ustream.tv/embed/' + videoidVal;
        } else if ((tube === 'animalplanet') || (tube === 'embed_animalplanet')) {
            embedUrl = 'http://www.animalplanet.com/embed?page=' + videoidVal;
        } else if ((tube === 'dailymotion') || (tube === 'embed_dailymotion')) {
            embedUrl = 'http://www.dailymotion.com/embed/video/' + videoidVal;
        } else if ((tube === '5min') || (tube === 'embed_5min')) {
            embedUrl = 'http://embed.5min.com/' + videoidVal;
        } else if ((tube === 'cc') || (tube === 'embed_cc')) {
            embedUrl = 'http://media.mtvnservices.com/embed/' + videoidVal;
        } else if ((tube === 'meta_ua') || (tube === 'embed_meta_ua')) {
            embedUrl = 'http://video.meta.ua/iframe/' + videoidVal;
        } else if ((tube === 'tune_pk') || (tube === 'embed_tune_pk')) {
            embedUrl = 'http://tune.pk/player/embed_player.php?vid=' + videoidVal + '&autoplay=no';
        } else if ((tube === 'metacafe') || (tube === 'embed_metacafe')) {
            embedUrl = 'http://www.metacafe.com/embed/' + videoidVal;
        } else if ((tube === 'liveleak') || (tube === 'embed_liveleak')) {
            embedUrl = 'http://www.liveleak.com/ll_embed?f=' + videoidVal;
        } else if ((tube === 'ebaumsworld') || (tube === 'embed_ebaumsworld')) {
            embedUrl = 'http://www.ebaumsworld.com/media/embed/' + videoidVal;
        } else if ((tube === 'bliptv') || (tube === 'embed_blip')) {
            embedUrl = 'http://blip.tv/play/' + videoidVal;
        } else if ((tube === 'funnyordie') || (tube === 'embed_funnyordie')) {
            embedUrl = 'http://www.funnyordie.com/embed/' + videoidVal;
        } else if ((tube === 'stupidvideos') || (tube === 'embed_stupidvideos')) {
            embedUrl = 'http://www.stupidvideos.com/embed/?video=' + videoidVal;
        }
        return embedUrl;
    }

    public extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
}
