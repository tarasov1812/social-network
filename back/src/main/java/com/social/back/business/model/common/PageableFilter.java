package com.social.back.business.model.common;

import com.social.back.business.constants.BusinessCommonConstants;

public class PageableFilter {

    private int querySize;
    private int queryIndex;

    /**
     * Constructor basico de la clase
     */
    public PageableFilter() {
        this.querySize = Integer.valueOf(BusinessCommonConstants.QUERY_SIZE);
        this.queryIndex = Integer.valueOf(BusinessCommonConstants.QUERY_INITIAL_INDEX);
    }

    /**
     * Constructor that set index and size
     *
     * @param index
     * @param size
     */
    public PageableFilter(int index, int size) {
        this.querySize = size;
        this.queryIndex = index;
    }
    public int getQuerySize() {
        return querySize;
    }

    public void setQuerySize(int querySize) {
        this.querySize = querySize;
    }

    public int getQueryIndex() {
        return queryIndex;
    }

    public void setQueryIndex(int queryIndex) {
        this.queryIndex = queryIndex;
    }

}
