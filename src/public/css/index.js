import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "height": "100%",
        "overflow": "hidden"
    },
    "body": {
        "height": "100%",
        "overflow": "hidden",
        "background": "radial-gradient(ellipse at top left, #94D28A 0%, #D0D8CB 57%)"
    },
    "total": {
        "fontSize": 30,
        "color": "red",
        "position": "absolute",
        "top": 100,
        "right": 100
    },
    "hand": {
        "position": "relative",
        "top": 300,
        "left": "50%",
        "backgroundColor": "#f3c5ad",
        "width": 300,
        "height": 230,
        "borderRadius": 30,
        "border": "1px solid #8c3e15",
        "WebkitTransform": "rotate(90deg)",
        "cursor": "pointer"
    },
    "hand:before": {
        "display": "block",
        "content": "''",
        "height": 260,
        "width": 200,
        "backgroundColor": "#f3c5ad",
        "position": "absolute",
        "left": 50,
        "bottom": -220,
        "borderLeft": "1px solid #8c3e15"
    },
    "hand:after": {
        "display": "block",
        "content": "''",
        "height": 80,
        "width": 200,
        "backgroundColor": "#f3c5ad",
        "position": "absolute",
        "left": -120,
        "bottom": 30,
        "borderLeft": "1px solid #8c3e15",
        "borderRadius": 80,
        "WebkitTransform": "rotate(30deg)",
        "zIndex": -10,
        "boxShadow": "80px -10px 80px -2px rgb(246, 222, 200) inset,140px -10px 50px -2px rgb(226, 179, 146) inset"
    },
    "finger": {
        "position": "absolute",
        "bottom": "80%",
        "right": 0,
        "width": 75,
        "height": 75,
        "borderRadius": "75px 75px 0 0",
        "backgroundColor": "#f3c5ad",
        "borderLeft": "1px solid #b9511b",
        "borderRight": "1px solid #b9511b",
        "borderTop": "1px solid #b9511b",
        "boxShadow": "10px -1px 30px 10px rgb(246, 222, 200) inset,10px -10px 50px -2px rgb(226, 179, 146) inset"
    },
    "finger:before": {
        "position": "absolute",
        "bottom": 0,
        "right": 74,
        "width": 75,
        "height": 75,
        "borderRadius": "75px 75px 0 0",
        "backgroundColor": "#f3c5ad",
        "borderLeft": "1px solid #b9511b",
        "borderRight": "1px solid #b9511b",
        "borderTop": "1px solid #b9511b",
        "boxShadow": "10px -1px 30px 10px rgb(246, 222, 200) inset,10px -10px 50px -2px rgb(226, 179, 146) inset",
        "display": "block",
        "content": "''"
    },
    "hand finger:nth-of-type(2)": {
        "right": 149
    },
    "hide": {
        "display": "none"
    },
    "num": {
        "display": "block !important",
        "WebkitAnimation": "neon2 5s ease-in-out alternate",
        "animation": "neon2 3s ease-in-out alternate",
        "WebkitAnimationIterationCount": 1,
        "fontSize": 40,
        "color": "#FF1177",
        "position": "absolute",
        "right": "0%",
        "top": "0%"
    },
    "star": {
        "marginTop": 300,
        "marginRight": "50%",
        "marginBottom": 300,
        "marginLeft": "50%",
        "position": "relative",
        "display": "block",
        "color": "red",
        "width": 0,
        "height": 0,
        "zIndex": 999,
        "borderRight": "100px solid transparent",
        "borderBottom": "70px  solid red",
        "borderLeft": "100px solid transparent",
        "MozTransform": "rotate(35deg)",
        "WebkitTransform": "rotate(35deg)",
        "MsTransform": "rotate(35deg)",
        "OTransform": "rotate(35deg)"
    },
    "star:before": {
        "borderBottom": "80px solid red",
        "borderLeft": "30px solid transparent",
        "borderRight": "30px solid transparent",
        "position": "absolute",
        "height": 0,
        "width": 0,
        "top": -45,
        "left": -65,
        "display": "block",
        "content": "",
        "WebkitTransform": "rotate(-35deg)",
        "MozTransform": "rotate(-35deg)",
        "MsTransform": "rotate(-35deg)",
        "OTransform": "rotate(-35deg)"
    },
    "star1": {
        "position": "relative",
        "display": "block",
        "color": "red",
        "top": 3,
        "left": -105,
        "width": 0,
        "height": 0,
        "borderRight": "100px solid transparent",
        "borderBottom": "70px solid red",
        "borderLeft": "100px solid transparent",
        "WebkitTransform": "rotate(-70deg)",
        "MozTransform": "rotate(-70deg)",
        "MsTransform": "rotate(-70deg)",
        "OTransform": "rotate(-70deg)"
    }
});