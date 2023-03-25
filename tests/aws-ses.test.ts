import { ProcessEmail } from '../src/helpers/aws'

test("Test process email via AWS SES.", () => {
    var t = ProcessEmail("test@test.com");
    expect(t).toBe(true);
})
