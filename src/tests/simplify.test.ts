import { simplify } from "../index"

describe("interview", () => {
    it("should do the simplification", () => {
        expect(simplify("cb+cba")).toEqual("bc+abc");
        expect(simplify("2xy-yx")).toEqual("xy");
        expect(simplify("-a+5ab+3a-c-2a")).toEqual("-c+5ab");
        expect(simplify("-abc+3a+2ac")).toEqual("3a+2ac-abc");
        expect(simplify("xyz-xz")).toEqual("-xz+xyz");
        expect(simplify("a+ca-ab")).toEqual("a-ab+ac");
        expect(simplify("xzy+zby")).toEqual("byz+xyz");
        expect(simplify("-y+x")).toEqual("x-y");
        expect(simplify("y-x")).toEqual("-x+y");
    })
})