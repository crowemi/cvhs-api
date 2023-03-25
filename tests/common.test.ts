import { HealthCheck } from '../src/helpers/common'

test("Tests HealthCheck function", () => {
    expect(HealthCheck()).toBe(true);
});

test("Tests ProcessError function.", () => {
    // var ret = ProcessError();
})