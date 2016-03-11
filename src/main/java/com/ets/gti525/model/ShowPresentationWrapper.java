package com.ets.gti525.model;

public class ShowPresentationWrapper {

    private ShowPresentation showPresentation;
    private int numberOfTicketsRemaining;

    public ShowPresentationWrapper() {

    }

    public ShowPresentation getShowPresentation() {
        return showPresentation;
    }

    public void setShowPresentation(ShowPresentation showPresentation) {
        this.showPresentation = showPresentation;
    }

    public int getNumberOfTicketsRemaining() {
        return numberOfTicketsRemaining;
    }

    public void setNumberOfTicketsRemaining(int numberOfTicketsRemaining) {
        this.numberOfTicketsRemaining = numberOfTicketsRemaining;
    }
}
