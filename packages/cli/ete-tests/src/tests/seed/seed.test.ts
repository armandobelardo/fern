import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/fs-utils";
import { FERN_DIRECTORY } from "@fern-api/project-configuration";
import { runSeedCli } from "../../utils/runSeedCli";
import { init } from "../init/init";

const FIXTURES_DIR = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures"));

describe("seed", () => {
    it("python", async () => {
        const { exitCode, stdout } = await runSeedCli(
            ["test", "--workspace", "sdk", "--log-level", "info", "--fixture", "exhaustive"],
            {
                cwd: FIXTURES_DIR
            }
        );
        expect(stdout).toContain("test cases passed");
        expect(exitCode).toEqual(0);
    }, 180_000);

    it("custom fixture", async () => {
        const pathOfDirectory = await init();

        const { exitCode, stdout } = await runSeedCli(
            [
                "test",
                "--workspace",
                "sdk",
                "--log-level",
                "info",
                "--custom-fixture",
                join(pathOfDirectory, RelativeFilePath.of(FERN_DIRECTORY))
            ],
            {
                cwd: FIXTURES_DIR
            }
        );

        expect(stdout).toContain("Wrote files to");
        expect(exitCode).toEqual(0);
    }, 180_000);
});
